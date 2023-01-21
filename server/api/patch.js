import mysql from "mysql";

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
