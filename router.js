var express = require("express");
var db = require("./models/connection").Connection;

var route = express.Router();
route.use(express.static(__dirname + '/public'));
route.get("/",function(req,res){
  res.render("app/home",{home:"active"});
})
route.get("/eventos",function(req,res){
  res.render("app/eventos",{eventos:"active"})
})
route.get("/getEvents/:id",function(req,res){
  console.log(req.params);
  db.query("SELECT * FROM personas",[],function(err,rows){
    res.jsonp(rows[0]);
  })
})

module.exports = route;