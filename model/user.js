var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    questions: {
    q1:{statement:String, spoof:Boolean},
    q2:{statement:String, spoof:Boolean},
    q3:{statement:String, spoof:Boolean},
    q4:{statement:String, spoof:Boolean},
    q5:{statement:String, spoof:Boolean}
  },
  name:String,
  color:{
    red:Number,
    green:Number,
    blue:Number
  }
});

// figure out how to do required:true on the questions

var User = mongoose.model("User", UserSchema);
module.exports = User;
