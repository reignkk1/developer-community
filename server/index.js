const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "mydb",
});

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000, () => console.log("서버가 작동 중입니다!"));
