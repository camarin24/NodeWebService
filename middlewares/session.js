var User = require("../models/user").User;

module.exports = function(req, res,next){
    if(!req.session.user){
        res.redirect("/login.html");
    }else{
        User.findById(req.session.user,function(err, user){
          if(err){
            console.log("Erro al buscar el usuario");
            rs.redirect("/login");
          }else{
            res.locals = { user:user};
            next();
          }
        })
    }
}