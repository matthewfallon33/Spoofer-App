require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var app = express();

var User = require("./model/user");

// User.find({name:"Joe Bloggs"}, function(err, user){
//   if(err){
//     console.log(err);
//   } else{
//     console.log(user[0]);
//   }
// })

mongoose.connect(process.env.DBPATH)
  .then(function(data){
    console.log("DB Connection established...");
  })
  .catch(logError)

  function logError(err){
    console.log(err);
  }
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {

  res.render("index");

});

app.get("/register", (req, res) => {

  res.render("register");

});

app.post("/register", (req, res) => {

  // console.log(User);
  console.log(req.body);
  strToBoolean(req.body.q1Spoof);
  strToBoolean(req.body.q2Spoof)
  strToBoolean(req.body.q3Spoof);
  console.log(req.body.q3Spoof);

  console.log("User:\n" + User());
  // User.firstname = req.body.firstname;
  // User.surname = req.body.surname;
  // User.questions.q1.statement = req.body.q1;
  // User.questions.q1.spoof = strToBoolean(req.body.q1Spoof);
  // User.questions.q2.statement = req.body.q2;
  // User.questions.q2.spoof = strToBoolean(req.body.q2Spoof);
  // User.questions.q3.statement = req.body.q3;
  // User.questions.q3.spoof = strToBoolean(req.body.q3Spoof);
  //   User.save(err => console.log("Did not save to database: \n" + err));

});

function strToBoolean(string){
   switch(string.toLowerCase().trim()){
    case "false": case "no": case "0": case "": return false; default: return true;}
}
// ^ put in utils folder/file

app.listen(process.env.PORT, () => {
  console.log("App Listening on Port: " + process.env.PORT);
});
