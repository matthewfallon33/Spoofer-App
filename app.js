require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var app = express();

var User = require("./model/user");

User.find({name:"Matthew Fallon"}, function(err, user){
  if(err){
    console.log(err);
  } else{
    console.log(user);
    console.log(user[0].name)
    console.log(user[0].rgbVal);
    console.log(user[0].questions["q1"]);
    console.log(user[0]._id);
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

app.listen(process.env.PORT, () => {
  console.log("App Listening on Port: " + process.env.PORT);
});
