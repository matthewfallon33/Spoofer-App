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
  let user = new User();
  user.firstname = req.body.firstname;
  user.surname = req.body.surname;
  user.questions.q1.statement = req.body.q1;
  user.questions.q1.spoof = strToBoolean(req.body.q1Spoof);
  user.questions.q2.statement = req.body.q2;
  user.questions.q2.spoof = strToBoolean(req.body.q2Spoof);
  user.questions.q3.statement = req.body.q3;
  user.questions.q3.spoof = strToBoolean(req.body.q3Spoof);
  user.color.red = 255;
  user.color.green = 255;
  user.color.blue = 255;
    user.save(err => {if(err){console.log("Error");}
    else{
      console.log("Saved to DB!");
      res.redirect("/");
    }});
// so now that we can save the data, we then need to be able to
// render the users profile with some session data
// find a node session lib and use it
// so this way we can pull data from the db based on id
// we should set the session id to the mongo object id
});

function strToBoolean(string){
   switch(string.toLowerCase().trim()){
    case "false": case "no": case "0": case "": return false; default: return true;}
}
// ^ put in utils folder/file

app.listen(process.env.PORT, () => {
  console.log("App Listening on Port: " + process.env.PORT);
});
