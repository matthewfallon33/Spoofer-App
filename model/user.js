var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name:String,
  questions: Schema.types.mixed,
  rgbVal:String
});

var User = mongoose.model("User", userSchema);  
