var express = require("express");
var db = require("./models/connection").Connection;
var fs = require("fs");
var formidable = require('formidable');

var route = express.Router();
route.use(express.static(__dirname + '/public'));
// route.use(formidable.parse());

route.get("/", function (req, res) {
  res.render("app/home", { home: "active" });
})
route.get("/eventos", function (req, res) {
  res.render("app/eventos", { eventos: "active" })
})

route.post("/crearEvento", function (req, res) {
  var nombre = "";
  var datos = [];
  var prefix = Math.floor((Math.random() * 9999) + 1);

  var form = new formidable.IncomingForm();
  form.multiples = true;

  form.uploadDir = __dirname + '/public/uploads/';
  form.on('field', function (name, value) {
    datos.push(value);
  });

  form.on('file', function (field, file) {
    nombre = prefix + "" + file.name;
    fs.rename(file.path, form.uploadDir + nombre);
  });

  // log any errors that occur
  form.on('error', function (err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function () {
    var _d = {
      nombre: datos[0],
      descripcion: datos[1],
      img: nombre,
      creador: req.session.login
    }
    console.log(_d);
    db.query("INSERT INTO eventos SET ?", _d, function (err, rows) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        res.redirect("/app/eventos")
      }
    })
  });

  // parse the incoming request containing the form data
  form.parse(req);
})
route.get("/getEvents/:id", function (req, res) {
  console.log(req.params);
  db.query("CALL get_events(?)", [req.session.login], function (err, rows) {
    res.json(rows);
  })
})
route.get("/cerrar", function (req, res) {
  req.session.destroy();
  res.redirect("/login");
})

module.exports = route;