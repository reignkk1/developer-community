import mysql from "mysql";
import bcrypt from "bcrypt";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
});

//==================================== Article ========================================

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

//==================================== User ========================================

export function userPost(req, res) {
  const { userID, password, email, name, nickname } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hashPassword) {
      const sqlQuery =
        "INSERT INTO user (userID,password,email,name,nickname) VALUES (?,?,?,?,?)";
      db.query(
        sqlQuery,
        [userID, hashPassword, email, name, nickname],
        (error, result) => {
          res.send("성공");
        }
      );
    });
  });
}
