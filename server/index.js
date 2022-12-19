const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notice/get", function (req, res) {
  const sqlQuery = "SELECT * From notice ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});

app.get("/api/notice/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM notice WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});

app.post("/api/notice/insert", (req, res) => {
  const { title, content, date, writerID } = req.body;
  console.log(title, content, date, writerID);
  const sqlQuery =
    "INSERT INTO notice (title,content,date,writerID) VALUES (?,?,?,?)";
  db.query(sqlQuery, [title, content, date, writerID], (error, result) => {
    res.send("성공!");
  });
});

app.listen(8000, () => console.log("서버가 작동 중입니다!"));
