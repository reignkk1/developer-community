const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "board",
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", function (req, res) {
  const sqlQuery = "SELECT * FROM board;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const { title, content } = req.body;
  const sqlQuery = "INSERT INTO board (title,content) VALUES (?,?)";
  db.query(sqlQuery, [title, content], (error, result) => {
    res.send("성공!");
  });
});

app.listen(3000, () => console.log("서버가 작동 중입니다!"));
