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

// ============================== Get 요청 =========================================

app.get("/notice", function (req, res) {
  const sqlQuery = "SELECT * From notice ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});
app.get("/question", function (req, res) {
  const sqlQuery = "SELECT * From question ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});
app.get("/life", function (req, res) {
  const sqlQuery = "SELECT * From life ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});
app.get("/quote", function (req, res) {
  const sqlQuery = "SELECT * From quote ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});

app.get("/notice/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM notice WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});
app.get("/question/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM question WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});
app.get("/life/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM life WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});
app.get("/quote/:id", (req, res) => {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM quote WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
});
// ============================== POST 요청 =========================================

app.post("/notice", (req, res) => {
  const { title, content, date, writerID } = req.body;

  const sqlQuery =
    "INSERT INTO notice (title,content,date,writerID) VALUES (?,?,?,?)";
  db.query(sqlQuery, [title, content, date, writerID], (error, result) => {
    res.send("성공!");
  });
});
app.post("/question", (req, res) => {
  const { title, content, date, writerID } = req.body;

  const sqlQuery =
    "INSERT INTO question (title,content,date,writerID) VALUES (?,?,?,?)";
  db.query(sqlQuery, [title, content, date, writerID], (error, result) => {
    res.send("성공!");
  });
});
app.post("/life", (req, res) => {
  const { title, content, date, writerID } = req.body;

  const sqlQuery =
    "INSERT INTO life (title,content,date,writerID) VALUES (?,?,?,?)";
  db.query(sqlQuery, [title, content, date, writerID], (error, result) => {
    res.send("성공!");
  });
});
app.post("/quote", (req, res) => {
  const { title, content, date, writerID } = req.body;

  const sqlQuery =
    "INSERT INTO quote (title,content,date,writerID) VALUES (?,?,?,?)";
  db.query(sqlQuery, [title, content, date, writerID], (error, result) => {
    res.send("성공!");
  });
});

app.listen(8000, () => console.log("서버가 작동 중입니다!"));
