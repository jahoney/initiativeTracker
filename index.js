"use strict";


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
  console.log(req.body);
  /*
  if (req.body.metadata.intentName == "startInitiative") {
    speech = "Intent of startInitiative passed to server.";
  }
  */
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
