import mysql from "mysql";
import bcrypt from "bcrypt";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
  multipleStatements: true,
});

export function noticePatch(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const sqlQuery = `UPDATE notice SET title="${title}",content="${content}" WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    res.send("성공!");
  });
}
export function questionPatch(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const sqlQuery = `UPDATE question SET title="${title}",content="${content}" WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    res.send("성공!");
  });
}
export function lifePatch(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const sqlQuery = `UPDATE life SET title="${title}",content="${content}" WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    res.send("성공!");
  });
}
export function quotePatch(req, res) {
  const { id } = req.params;
  const { title } = req.body;
  const sqlQuery = `UPDATE quote SET title="${title}" WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    res.send("성공!");
  });
}

export function profilePatch(req, res) {
  const { name, nickname } = req.body;
  const {
    user: { id },
  } = req.session;

  const sqlQuery = `UPDATE user SET name="${name}",nickname="${nickname}" WHERE id = ${id};
   UPDATE notice SET nickname="${nickname}" WHERE writerID = ${id};
   UPDATE quote SET nickname="${nickname}" WHERE writerID = ${id};
   UPDATE life SET nickname="${nickname}" WHERE writerID = ${id};
   UPDATE question SET nickname="${nickname}" WHERE writerID = ${id}
   `;

  db.query(sqlQuery, (error, result) => {
    return res.send("성공");
  });
}

export async function passWordChangePatch(req, res) {
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
