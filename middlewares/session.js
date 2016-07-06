var User = require("../models/user").User;

module.exports = function(req, res,next){
    if(!req.session.user){
        res.redirect("login");
    }else{
        User.findById(req.session.user,function(err, user){
          if(err){
            console.log("Erro al buscar el usuario");
            rs.redirect("/");
          }else{
            res.locals = { user:user};
            next();
          }
        })
    }
}