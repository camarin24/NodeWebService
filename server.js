var express = require("express"),
  bodyparser = require("body-parser"),
  db = require("./models/connection").Connection,
  session = require("express-session"),
  router_app = require("./router"),
  session_middleware = require("./middlewares/session"),
  validator = require('express-validator'),
  app;

var port = process.env.PORT || 8081;
var ip_address = process.env.IP || '127.0.0.1';

app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(validator());
app.set("view engine", "jade");
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: "tupapitomk24",
  resave: false,
  saveUninitialized: false
}));

/*Metodos que se acceden por get*/
app.get("/login", function (req, res) {
  res.render("login");
})

app.get("/registro", function (req, res) {
  res.render("registro");
})
/*fin get*/

/*Metodos que se acceden por post*/
app.post("/login", function (req, res) {
  db.query('SELECT * FROM personas WHERE correo_electronico = ? AND contrasenia = ?', [req.body.email, req.body.password], function (err, rows) {
    if (err) {
      res.redirect("/login");
      throw err;
    } else {
      if (rows.length > 0) {
        req.session.login = rows[0]._id;

        res.redirect("/app");
      } else {
        res.render("login", { errors: "El usuario o contraseña son incorrectos." });
      }
    }
  })
})
app.post("/registro", function (req, res) {
  var datos = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecha_nacimiento: req.body.fechaNacimiento,
    correo_electronico: req.body.email,
    contrasenia: req.body.password
  };
  db.query("SELECT * FROM personas WHERE correo_electronico = ?", [req.body.email], function (err, user) {
    if (err) throw err;
    if (user.length > 0) {
      res.render("registro", { noRegistro: "Ya existe una persona con el mismo correo electónico" });
    } else {
      db.query('INSERT INTO personas SET ?', datos, function (err, rows) {
        if (err) throw err;
        res.redirect("/login");
        console.log('Last insert ID:', rows.insertId);
      });
    }
  })
})
/*fin post*/

/*Metodos de webservices*/
app.get("/user", function (req, res) {
  User.find(function (err, docs) {
    if (err) console.log(err);
    res.json(docs)
  })
});


app.use("/app", session_middleware);
app.use("/app", router_app);
app.listen(port, ip_address);


// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });