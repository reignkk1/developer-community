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

export async function userPost(req, res) {
  const { userID, password, email, name, nickname, create_time } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const sqlQuery =
    "INSERT INTO user (userID,password,email,name,nickname,create_time) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlQuery,
    [userID, hashPassword, email, name, nickname, create_time],
    (error, result) => {
      res.send("성공");
    }
  );
}

export async function userLoginPost(req, res) {
  const { loginUserID, loginPassword } = req.body;

  const sqlQueryUserID = `SELECT * FROM user WHERE userID = '${loginUserID}'`;

  db.query(sqlQueryUserID, async (error, result) => {
    if (!result.length)
      return res.send({ errorMsg: "아이디가 존재하지 않습니다!" });

    const matchPassword = await bcrypt.compare(
      loginPassword,
      result[0].password
    );
    if (!matchPassword)
      return res.send({ errorMsg: "비밀번호가 존재하지 않습니다!" });

    req.session.logined = true;
    req.session.user = result[0];

    return res.send("로그인 성공!");
  });
}
