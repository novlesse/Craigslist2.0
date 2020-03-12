const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.dsn,
  user: process.env.admin,
  password: process.env.password,
  database: `craiglist2_project`
});

connection.connect(function (err) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("connected");
  }
});

module.exports = connection;
