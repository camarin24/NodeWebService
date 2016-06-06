var express = require("express"),
    bodyparser = require("body-parser"),
    http = require("http"),
    User = require("./models/user").User,
    app,
    router,
    server;

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

router = express.Router();

router.get("/user/:email",function(req,res){
  console.log(req);
  User.find({email:req.params.email},function(err,docs){
    if(err)console.log(err);
    res.json(docs)
  })
})

app.use("/service",router);
server = http.createServer(app);
server.listen(port,ip_address);
