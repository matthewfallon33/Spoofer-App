var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname:String,
    surname:String,
    questions: {
    q1:{statement:String, spoof:Boolean},
    q2:{statement:String, spoof:Boolean},
    q3:{statement:String, spoof:Boolean}
  },
    color:{
    red:Number,
    green:Number,
    blue:Number
  }
});

// figure out how to do required:true on the questions

var User = mongoose.model("User", UserSchema);
module.exports = User;
