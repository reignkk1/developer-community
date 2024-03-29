import bcryptjs from 'bcryptjs';
import db from './../models/mysql.js';

// 유저 회원가입
export async function userSignUp(req, res) {
  const { userID, password, email, name, nickname, create_time } = req.body;
  const hashPassword = await bcryptjs.hash(password, 10);

  const sqlQuery =
    'INSERT INTO user (userID,password,email,name,nickname,create_time) VALUES (?,?,?,?,?,?)';
  db.query(
    sqlQuery,
    [userID, hashPassword, email, name, nickname, create_time],
    (error, result) => {
      res.send('성공');
    }
  );
}
// 유저 로그인
export async function userLogin(req, res) {
  const { loginUserID, loginPassword } = req.body;

  const sqlQueryUserID = `SELECT * FROM user WHERE userID = '${loginUserID}'`;

  db.query(sqlQueryUserID, async (error, result) => {
    if (!result.length)
      return res.send({ errorMsg: '아이디가 존재하지 않습니다!' });

    const matchPassword = await bcryptjs.compare(
      loginPassword,
      result[0].password
    );
    if (!matchPassword)
      return res.send({ errorMsg: '비밀번호가 존재하지 않습니다!' });

    req.session.logined = true;
    req.session.user = result[0];

    return res.send();
  });
}

// 유저 로그아웃
export function userLogout(req, res) {
  req.session.destroy();
  return res.send();
}

// 유저 정보 불러오기
export function userInfoGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM user WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result[0]);
  });
}

// 유저 삭제
export function userDelete(req, res) {
  const { id } = req.session.user;
  const sqlQuery = `DELETE FROM user WHERE id = ${id};
                    DELETE FROM posts WHERE writerID = ${id};
                    DELETE FROM comments WHERE writerID = ${id};
    `;
  db.query(sqlQuery, (error, result) => {
    req.session.destroy();
    return res.send(result);
  });
}

// 유저 프로필 정보 수정
export function userProfileModify(req, res) {
  const { name, nickname } = req.body;
  const {
    user: { id },
  } = req.session;

  const sqlQuery = `UPDATE posts SET nickname="${nickname}" WHERE writerID = ${id};
  UPDATE user SET name='${name}', nickname="${nickname}" WHERE id = ${id};
  UPDATE comments SET nickname="${nickname}" WHERE writerID = ${id};
  `;

  db.query(sqlQuery, (error, result) => {
    req.session.user.nickname = nickname;
    req.session.user.name = name;
    return res.send('성공');
  });
}

// 유저 프로필 사진 업로드

export function uploadFile(req, res) {
  const userAvartarImg = req.file.location;
  const sqlQuery = `UPDATE user SET avartar= '${userAvartarImg}' WHERE id = ${req.session.user.id};
                    UPDATE posts SET avartar = '${userAvartarImg}' WHERE writerID = ${req.session.user.id};
                    UPDATE comments SET avartar = '${userAvartarImg}' WHERE writerID = ${req.session.user.id};`;

  db.query(sqlQuery, (error, result) => {
    req.session.user.avartar = userAvartarImg;

    return res.send();
  });
}

// 로그인 한 유저의 정보 불러오기
export function loginUserInfo(req, res) {
  return res.send(req.session.user);
}

// 유저 활동내역 불러오기
export function userActivity(req, res) {
  const { id, page } = req.params;
  const sqlQuery = `SELECT * From ${page} WHERE writerID = '${id}' ORDER BY date DESC`;

  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
