var mysql = require('mysql');
module.exports.Connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'warframe'
});
