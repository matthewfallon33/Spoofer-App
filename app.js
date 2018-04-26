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

  console.log(req.body.firstname);
  console.log(req.body.surname);
  console.log(req.body.q1);
  console.log(req.body.q2);
  console.log(req.body.q3);
  console.log(req.body.q4);
  console.log(req.body.q5);

});

app.listen(process.env.PORT, () => {
  console.log("App Listening on Port: " + process.env.PORT);
});
