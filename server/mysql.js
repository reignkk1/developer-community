const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "mydb",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("DB is Connected!");
});
