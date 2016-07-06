var express = require("express"),
    bodyparser = require("body-parser"),
    User = require("./models/user").User,
    session = require("express-session"),
    router_app = require("./router"),
    session_middleware = require("./middlewares/session"),
    app;

var port = process.env.PORT || 8080;
var ip_address = process.env.IP || '127.0.0.1';

app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","jade");
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret:"tupapitomk24",
  resave:false,
  saveUninitialized:false
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/",function(req,res){
  res.render("login");
})

app.post("/login",function(req,res){
    User.findOne({email:req.body.email,password:req.body.password},
    function(err,docs){
      req.session.user = docs._id;
      res.redirect("/app");
  });
})

app.get("/user",function(req,res){
  User.find(function(err,docs){
    if(err)console.log(err);
    res.json(docs)
  })
});


app.use("/app",session_middleware);
app.use("/app",router_app);
app.listen(port,ip_address);
