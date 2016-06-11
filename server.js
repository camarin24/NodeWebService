var express = require("express"),
    bodyparser = require("body-parser"),
    User = require("./models/user").User,
    session = require("express-session"),
    session_middleware = require("./middlewares/session"),
    app;

var port = process.env.PORT || 8080;
var ip_address = process.env.IP || '127.0.0.1';

app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","jade");
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

app.get("/user",function(req,res){
  User.find(function(err,docs){
    if(err)console.log(err);
    res.json(docs)
  })
});


app.get('*', function(req, res){
  res.send('Error 404, que lastima.', 404);
});

app.use("/app",session_middleware);
app.listen(port,ip_address);
