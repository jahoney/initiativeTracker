"use strict";

const DialogflowApp = require('actions-on-google').DialogflowApp;
const express = require("express");
const bodyParser = require("body-parser");
var fs = require('fs');
var data = fs.readFileSync('initiative.json');

var initiative = JSON.parse(data);
data = JSON.stringify(initiative, null, 2);
fs.writeFile('initiative.json', data, finished);
function finished(err) {
  console.log('done');
}

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
  console.log(req.body.result.parameters.startInitiative);
  
  console.log(req.body.result.parameters.notThere);
  var doWork = null;

    if( req.body.result.parameters.startInitiative != null) {
      console.log("Complete");
    doWork = req.body.result.parameters.startInitiative;
    }

  
  console.log(doWork);
  //console.log(doWork.id);
  console.log(req.body.result.parameters);
  if(doWork != null) {
    console.log("STARTING INIT!!!");
  }
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
  var addPlayerCharacter = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.addPlayerCharacter ? req.body.result.parameters.addPlayerCharacter
      : "";
  //var intentName = req.body.result.intentName;
 
  var action = req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.initiativeAction ? req.body.result.parameters.initiativeAction
      : "No action defined";
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText ? req.body.result.parameters.echoText
      : "Sorry there was an issue. Can you say that again?";
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
    action: action,
    source: "webhook-echo-sample"
  });
});


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
