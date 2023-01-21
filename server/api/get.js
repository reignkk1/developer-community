import mysql from "mysql";
// 125.142.99.87
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
});

export function noticeGet(req, res) {
  const sqlQuery = "SELECT * From notice ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
export function questionGet(req, res) {
  const sqlQuery = "SELECT * From question ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
export function lifeGet(req, res) {
  const sqlQuery = "SELECT * From life ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function quoteGet(req, res) {
  const sqlQuery = "SELECT * From quote ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function noticeDetailGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM notice WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
export function questionDetailGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM question WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
export function lifeDetailGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM life WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function quoteDetailGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM quote WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function profileGet(req, res) {
  const {
    user: { id },
  } = req.session;

  const sqlQuery = `SELECT name,nickname FROM user WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
