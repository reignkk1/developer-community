import bcrypt from "bcrypt";
import db from "../mysql.js";

// 비밀번호 변경 수정
export async function passWordChange(req, res) {
  const { currentPassWord, newPassWord } = req.body;

  const sqlQuery = `SELECT password FROM user WHERE id = ${req.session.user.id} `;

  db.query(sqlQuery, async (error, result) => {
    const matchPassword = await bcrypt.compare(
      currentPassWord,
      result[0].password
    );

    if (!matchPassword) {
      return res.send("현재 비밀번호가 일치하지 않습니다.");
    } else {
      const hashPassword = await bcrypt.hash(newPassWord, 10);
      const sqlQuery = `UPDATE user SET password='${hashPassword}' WHERE id =${req.session.user.id}`;

      db.query(sqlQuery, (error2, result2) => {
        return res.send("변경이 완료되었습니다!");
      });
    }
  });
}

// 관리자 확인
export function managerConfirm(req, res) {
  if (req.session.user) {
    const { manager } = req.session.user;
    return res.send(`${manager}`);
  }

  return res.send("0");
}

// 검색한 게시물 불러오기
export function searchArticleGet(req, res) {
  const { keyword } = req.query;
  const sqlQuery = `SELECT * FROM posts WHERE title like '%${keyword}%'`;

  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
