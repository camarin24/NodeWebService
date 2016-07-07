var db = require("../models/connection").Connection;

module.exports = function (req, res, next) {
  if (!req.session.login) {
    res.redirect("/login");
  } else {
    db.query("SELECT * FROM personas WHERE _id = ?", [req.session.login], function (err, rows) {
      if (err) {
        res.locals.userName = "NaN";
        next();
      } else {
        res.locals.userName = rows[0].nombre + " " + rows[0].apellido;
        console.log(rows[0].nombre);
        next();
      }
    })

  }
}