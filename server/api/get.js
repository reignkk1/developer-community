import mysql from "mysql";

const db = mysql.createPool({
  host: "125.142.99.87",
  user: "reignkk",
  password: "alsrua17931",
  database: "webdb",
});

export function noticeGet(req, res) {
  const sqlQuery = "SELECT * From notice ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    console.log(result);
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
