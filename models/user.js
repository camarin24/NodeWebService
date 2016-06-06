var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://camarin:tupapitomk24@ds023603.mlab.com:23603/node");

var user_schema = new Schema({
  name:String,
  user_name:String,
  password:String,
  age:Number,
  email:String
});

var User = mongoose.model("User",user_schema);
module.exports.User = User;
