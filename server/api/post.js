import mysql from "mysql";
import bcrypt from "bcrypt";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
});

//=======================================================================================

// 게시물 생성
export function postPost(req, res) {
  const { title, content, date } = req.body;
  const { page } = req.params;
  const { id, nickname } = req.session.user;

  const sqlQuery =
    "INSERT INTO posts (title,content,date,writerID,nickname,page) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlQuery,
    [title, content, date, id, nickname, page],
    (error, result) => {
      return res.send("성공!");
    }
  );
}

// 유저 회원가입
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

// 유저 로그인
export async function userLoginPost(req, res) {
  const { loginUserID, loginPassword, id, password } = req.body;

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

    return res.send(req.session.logined);
  });
}

// 유저 로그아웃
export function userLogout(req, res) {
  req.session.destroy();
  return res.send();
}

// 댓글 생성
export function commentPost(req, res) {
  const { commentText, date, postID, page } = req.body;
  const { id, nickname } = req.session.user;

  console.log(commentText, date, postID, page);

  const sqlQuery = `INSERT INTO comments (text,date,postID,writerID,nickname,page) VALUES (?,?,?,?,?,?)`;

  db.query(
    sqlQuery,
    [commentText, date, postID, id, nickname, page],
    (error, result) => {
      console.log(error);
      return res.send();
    }
  );
  return res.send("");
}
