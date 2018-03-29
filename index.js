"use strict";

const DialogflowApp = require('actions-on-google').DialogflowApp;
const express = require("express");
const bodyParser = require("body-parser");
//var character = require("./character.js").char;
var fs = require('fs');
var data = fs.readFileSync('initiative.json');

var initiative = JSON.parse(data);
data = JSON.stringify(initiative, null, 2);
fs.writeFile('initiative.json', data, finished);
function finished(err) {
  console.log('done');
}

class character {
  constructor(name, initiative, initiativeModifier, isPlayerCharacter) {
    this.name = name;
    this.initiativeModifier = initiativeModifier;
    this.initiative = Math.ceil(Math.random()*20) + this.initiativeModifier;
    this.isPlayerCharacter = isPlayerCharacter;
  }
  getInitiative() {
    return this.initiative;
  }
  setInitiative(newInitiative) {
    this.initiative = parseInt(newInitiative);
  }
  getName() {
    return this.name;
  }
  getInitiativeModifier() {
    return this.initiativeModifier;
  }
}
var characterList = [];
var initiativeList = [];
var inInitiative = false;
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/initiative", function(req, res) {

  
  console.log("in POST");
  console.log(req.body);
  var speech = "";
  //var doWork = null;

  switch(true) {
    case (req.body.result.parameters.startInitiative != null) : 
      if(!inInitiative && characterList.length > 0) {
        console.log("Testing startInitiative");
        inInitiative = true;
        startInitiative();
        speech = "Get ready to battle.";
      }
      else if(initiativeList.length === 0) {
        speech = "You must add characters before starting initiative.";
      }
      else speech = "You are already in a battle. To exit, say exit battle. To go to the next turn, say next turn. To hear the current player, say whose turn is it?";
      break;
    case (req.body.result.parameters.addPlayerCharacter != null) : 
      if (!inInitiative) {
        console.log("Testing addPlayerCharacter");
        var test = new character(req.body.result.parameters.playerName, 0, parseInt(req.body.result.parameters.initiativeModifier), true);
        characterList.push(test);
        console.log(characterList);
        speech = test.getName() + " added to character list";
      }
      else {
        console.log("Already in battle, cannot add character.");
        speech = "You are already in a battle. To add a character, exit the battle and then add player.";
      }
      break;
     case (req.body.result.parameters.exitInitiative != null) : 
      if(inInitiative) {
        console.log("Testing exitInitiative");
        inInitiative = false;
        speech = "Exiting Initiative";
        initiativeList = [];
      }
      else speech = "You are not currently in battle. To start a battle say start battle.";
      break;
    case (req.body.result.parameters.currentInitiative != null) :
      if(inInitiative) {
        console.log("Looking for the current initiative.");

      }
      else {
        console.log("Not in intitiative.");
        speech = "You are not currently in initiative. To start a battle, say start battle.";
      }
      break;
    }
  
  
//   console.log("First Check");
//     if( req.body.result.parameters.startInitiative != null) {
//       console.log("Complete");
//     doWork = req.body.result.parameters.startInitiative;
//     }
  
//   console.log(doWork);
  
//   console.log("Second Check");
//   if( req.body.result.parameters.addPlayerCharacter != null) {
//       console.log("Complete");
//     doWork = req.body.result.parameters.addPlayerCharacter;
//     }

  
//   console.log(doWork);
  //console.log(doWork.id);
 // console.log(req.body.result.parameters);
  //if(doWork != null) {
  //  console.log(doWork);
 // }
  //var app = new DialogflowApp({request: req, response: res});
  //const assistant = new DialogflowApp({request: req, response: res});
//   if(req.body.params.startInitiative) {
//      console.log("HERE");
//      }
  //const intent = app.intent.TEXT;
  //console.log("GetIntent: " + intent );
   // Create functions to handle requests here
  //console.log("app created");
  //console.log(app);
  //var intent = req.getIntent();
  //console.log(intent);
//   var startInitiative = req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.startInitiative ? req.body.result.parameters.startInitiative
//       : "";
//   var addPlayerCharacter = req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.addPlayerCharacter ? req.body.result.parameters.addPlayerCharacter
//       : "";
//   //var intentName = req.body.result.intentName;
 
//   var action = req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.initiativeAction ? req.body.result.parameters.initiativeAction
//       : "No action defined";
//   var speech =
//     req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.echoText ? req.body.result.parameters.echoText
//       : "Sorry there was an issue. Can you say that again?";
  /*
  if( speech.toUpperCase() == "MIKE" || speech.toUpperCase() == "MIKE ADAMS" || speech.toUpperCase() == "MICHAEL" || speech.toUpperCase() == "MICHAEL ADAMS" || speech.toUpperCase() == "MERRICK" || speech.toUpperCase() == "ETIENNE" ) {
     speech = "You said your name is Ass. Is this correct?";
  }
  else if(speech == "no") speech = "It's okay, i don't like my little pony either...wink wink. What is your actual name?";
  else speech = "Hi " + speech + ". who else is there?";
  */
  /*
  if(startInitiative !== "") {
    speech = "We are starting. Start Initiative was passed.";
    startInitiative = "";
  }
  if(addPlayerCharacter !== "") {
    speech = "Add a player to the initiative list.";
    addPlayerCharacter = "";
  }
  */
 //speech = "Passed " + intentName;
  console.log(speech);
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

function startInitiative() {
  var initiativeToBeat = 0;
  //set initiative
  for(var i = 0; i < characterList.length; i++) {
     characterList[i].setInitiative((Math.ceil(Math.random()*20) + characterList[i].getInitiativeModifier));
  }   
  fs.writeFileSync("./initiative.json",JSON.stringify(characterList));
  console.log(characterList);
}

