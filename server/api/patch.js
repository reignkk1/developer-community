import mysql from "mysql";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
});

export default function noticePatch(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const sqlQuery = `UPDATE notice SET title="${title}",content="${content}" WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    res.send("성공!");
  });
}
