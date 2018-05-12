require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var path = require("path");
var app = express();

var User = require("./model/user");

mongoose.connect(process.env.DBPATH)
  .then(function(data){
    console.log("DB Connection established...");
  })
  .catch(logError)

  function logError(err){
    console.log(err);
  }
app.use(session({secret:process.env.SESS, resave:false, saveUninitialized:false}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  User.findById(req.session.obj_id, (err, user) => {
    if(err){
      console.log("Couldn't find any with that id");
    } else if(user){
      var output = `<h1>${user.firstname} ${user.surname}</h1>`;
      res.render("index", {firstname:user.firstname, surname:user.surname, questions:user.questions, colors:user.color})
    } else{
      res.redirect("/register");
    }
  });
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
  user.color.red = 0;
  user.color.green = 255;
  user.color.blue = 0;
    user.save((err, data) => {if(err){console.log("Error");}
    else{
      console.log("Saved to DB!");
      // console.log(data.id);
      req.session.obj_id = data._id;
      res.redirect("/");
    }});

});

app.post("/compare", (req, res) => {
  let wrongs = 0;
  User.findById(req.session.obj_id, (err, users) => {

    if(err){
      res.send("<h1>Sorry Error!</h1>");
    }
    else if(!users){
      res.send("<h1>No Users!</h1> <br> <a href='/register'>Register</a>")
    }
    else {
      for(var prop in req.body){
        for(var pro in users.questions){
          if(users.questions.hasOwnProperty(prop)){
            // console.log("DB:" + users.questions[prop].spoof + "\t");
          }
          // console.log("REQUEST:" + req.body[prop] + "\t");
          if(req.body[prop] !== users.questions[prop].spoof){
            wrongs++;
          }
          break;
        }
      }
    }
    // console.log("Wrongs: " + wrongs);
    let i = 0;
    while(i < wrongs){
      wrongGuess(req);
      i++;
    }
    let rights = 3 - wrongs;
    i = 0;
    while(i < rights){
      console.log("RIGHTS:" + rights + " I:" + i);
      rightGuess(req);
      i++;
    }
  });
});

let rightGuess = (req) => {
    User.findByIdAndUpdate(req.session.obj_id, {$inc: {"color.red": -25, "color.green": +25}}, (err, user) => {
    if(err){
      console.log("err");
    }else if(user){
    for(var prop in user.color){
      if(typeof user.color[prop] === "number"){
        if(user.color[prop] > 255){
          console.log(prop + ": Is more than 255");
        } else if(user.color[prop] < 0){
          console.log(prop + ": Is less than 0");
        } else{
          console.log(prop + " :Is within 0 - 255");
        }
      }
    }
    }
    else{
      res.redirect("/register");
    }
  })
}

// get 255 get the amount then minus 255 from the amount increment it by the result of the difference then increment by it

let wrongGuess = (req) => {
  User.findByIdAndUpdate(req.session.obj_id, {$inc: {"color.red": 25, "color.green": -25}}, (err, user) => {
    if(err){
      console.log("err");
    }else if(user){
    for(var prop in user.color){
      if(typeof user.color[prop] === "number"){
        if(user.color[prop] > 255){
          console.log(prop + ": Is more than 255");
        } else if(user.color[prop] < 0){
          console.log(prop + ": Is less than 0");
        } else{
          console.log("All values are within 0 - 255");
        }
      }
    }
    }
    else{
      res.redirect("/register");
    }
  })
}


function strToBoolean(string){
   switch(string.toLowerCase().trim()){
    case "false": case "no": case "0": case "": return false; default: return true;}
}
// ^ put in utils folder/file

app.listen(process.env.PORT, () => {
  console.log("App Listening on Port: " + process.env.PORT);
});
