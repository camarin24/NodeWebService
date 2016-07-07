module.exports = function (req, res, next) {
  if (!req.session.login) {
    res.redirect("/login");
  } else {
    console.log(req.session.login);
    next();
  }
}