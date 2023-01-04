import mysql from "mysql";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "webdb",
});

export function noticePost(req, res) {
  const { title, content, date, writerID } = req.body;

  const sqlQuery =
    "INSERT INTO notice (title,content,date,writerID) VALUES (?,?,?,?)";
  db.query(sqlQuery, [title, content, date, writerID], (error, result) => {
    res.send("성공!");
  });
}
export function questionPost(req, res) {
  const { title, content, date, writerID } = req.body;

  const sqlQuery =
    "INSERT INTO question (title,content,date,writerID) VALUES (?,?,?,?)";
  db.query(sqlQuery, [title, content, date, writerID], (error, result) => {
    res.send("성공!");
  });
}
export function lifePost(req, res) {
  const { title, content, date, writerID } = req.body;

  const sqlQuery =
    "INSERT INTO life (title,content,date,writerID) VALUES (?,?,?,?)";
  db.query(sqlQuery, [title, content, date, writerID], (error, result) => {
    res.send("성공!");
  });
}
export function quotePost(req, res) {
  const { title, date, writerID } = req.body;

  const sqlQuery = "INSERT INTO quote (title,date,writerID) VALUES (?,?,?)";
  db.query(sqlQuery, [title, date, writerID], (error, result) => {
    res.send("성공!");
  });
}
