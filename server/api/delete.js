import mysql from "mysql";

const db = mysql.createPool({
  // 125.142.99.87
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
});

export function noticeDelete(req, res) {
  const { id } = req.params;
  const sqlQuery = `DELETE FROM notice WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function questionDelete(req, res) {
  const { id } = req.params;
  const sqlQuery = `DELETE FROM question WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function lifeDelete(req, res) {
  const { id } = req.params;
  const sqlQuery = `DELETE FROM life WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function quoteDelete(req, res) {
  const { id } = req.params;
  const sqlQuery = `DELETE FROM quote WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function userDelete(req, res) {
  const { id } = req.session.user;
  const sqlQuery = `DELETE FROM user WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    req.session.destroy();
    return res.send(result);
  });
}

export function commentDelete(req, res) {
  const { id } = req.params;

  const sqlQuery = `DELETE FROM comments WHERE id = ${id}`;

  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
