var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    questions: {
    q1:String,
    q2:String,
    q3:String,
    q4:String,
    q5:String
  },
  name:String,
  rgbVal:String
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
