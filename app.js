require("dotenv").config();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var path = require("path");
var http = require('http');
var express = require('express'),
    app = module.exports.app = express();
let sess_id;

var server = http.createServer(app);
var io = require('socket.io').listen(server);  //pass a http.Server instance
server.listen(process.env.PORT);  //listen on port 80

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

 io.sockets.on("connection", (socket) => {
    socket.on("comparison", (data) => {
      // try store this in a function
      let wrongs = 0;
      console.log(data);  
      if(sess_id){
        console.log("SESS: " + sess_id);
        User.findById(sess_id, (err, users) => {
          if(err){
            console.log(err);
          }
          if(users){
            console.log(users);
            for(var prop in data){
              for(var pro in users.questions){
                if(data[prop] !== users.questions[prop].spoof){
                wrongs++;
            }
          break;
        }
      }
        let rights = 3 - wrongs;
        console.log("w: " + wrongs);
        console.log("R: " + rights)
        //  1: Get the right and wronguess func working
        //  2: Emit the new data and change the color with it
        let i = 0;
        while(i < rights){
          rightGuess()
          i++;
        }
        i = 0;
        while(i < wrongs){
          i++;
          wrongGuess();
        }
          var query = getColors(sess_id);
          query.exec((err, users) => {
            if(err){
              console.log(err);
            }else if(users){
              var colors = users[0].color;
              socket.emit("newColors", colors);
            } else{
              console.log("No users found with sess_id")
            }
          });
          // make sure the colors have been modified correctly (we'll allow outer ranges of 0 - 255 for now)
          }
          else{
            console.log("No users with this id!");
          }
        })
      }
      else{
        console.log("No sess id!")
      }
    })

    socket.on("disconnect", () => {
      console.log("User disconnected!");
    })

  })

app.get("/", (req, res) => {
   // pulls up the profile
   if(req.session.id){
      sess_id = req.session.obj_id;
   }
  User.findById(req.session.obj_id, (err, user) => {
    if(err){
      console.log("Couldn't find any with that id");
    } else if(user){
      res.render("index", {firstname:user.firstname, surname:user.surname, questions:user.questions, colors:user.color})
    } else{
      res.redirect("/register");
    }
  });

  
});

app.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if(err){
      console.log("errororororor");
    }
    if(users){
      res.render("users", { users });
    }
  })
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
    user.save((err, data) => {
    if(err){
      console.log("Error");
    }
    else{
      console.log("Saved to DB!");
      // console.log(data.id);
      req.session.obj_id = data._id;
      res.redirect("/");
    }});

});

let rightGuess = () => {
      User.findByIdAndUpdate(sess_id, {$inc: {"color.red": -25, "color.green": +25}}, (err, user) => {
    if(err){
      console.log("err");
    }else if(user){
      console.log("users right");
    }
    else{
      console.log("Error in rightGuess");
      // handle properly
    }
  })
}

// get 255 get the amount then minus 255 from the amount increment it by the result of the difference then increment by it

let wrongGuess = () => {
  User.findByIdAndUpdate(sess_id, {$inc: {"color.red": 25, "color.green": -25}}, (err, user) => {
    if(err){
      console.log("err");
    }else if(user){
      console.log("users wrong")
    }
    else{
      console.log("Error in wrong guess");
      // try handle this properly at some point
    }
  })
}

function getColors(id){
  var query = User.find({"_id": id});
  return query;
}

function strToBoolean(string){
   switch(string.toLowerCase().trim()){
    case "false": case "no": case "0": case "": return false; default: return true;}
}
// ^ put in utils folder/file
// make routing modular at some point