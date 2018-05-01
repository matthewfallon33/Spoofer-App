require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var app = express();

var User = require("./model/user");

User.find({name:"Joe Bloggs"}, function(err, user){
  if(err){
    console.log(err);
  } else{
    console.log(user[0]);
  }
})

mongoose.connect(process.env.DBPATH)
  .then(function(data){
    console.log("DB Connection established...");
  })
  .catch(logError)

  function logError(err){
    console.log(err);
  }
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {

  res.render("index");

});

app.get("/register", (req, res) => {

  res.render("register");

});

app.post("/register", (req, res) => {

  console.log(User);
  User.firstname = req.body.firstname;
  User.surname = req.body.surname;
  User.questions.q1 = req.body.q1;
  User.questions.q2 = req.body.q2;
  User.questions.q3 = req.body.q3;
  User.questions.q4 = req.body.q4;
  User.questions.q5 = req.body.q5;

  User.save(err => console.log(err));

});

app.listen(process.env.PORT, () => {
  console.log("App Listening on Port: " + process.env.PORT);
});
