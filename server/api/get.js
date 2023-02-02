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
    if (req.session.user) {
      const { id } = req.session.user;

      if (String(id) === result[0].writerID) {
        return res.send({ user: result, writerMatch: true });
      }
    }
    return res.send({ user: result, writerMatch: false });
  });
}
export function questionDetailGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM question WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    if (req.session.user) {
      const { id } = req.session.user;

      if (String(id) === result[0].writerID) {
        return res.send({ user: result, writerMatch: true });
      }
    }
    return res.send({ user: result, writerMatch: false });
  });
}
export function lifeDetailGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM life WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    if (req.session.user) {
      const { id } = req.session.user;

      if (String(id) === result[0].writerID) {
        return res.send({ user: result, writerMatch: true });
      }
    }
    return res.send({ user: result, writerMatch: false });
  });
}

export function quoteDetailGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM quote WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    if (req.session.user) {
      const { id } = req.session.user;

      if (String(id) === result[0].writerID) {
        return res.send({ user: result, writerMatch: true });
      }
    }
    return res.send({ user: result, writerMatch: false });
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

//==================================== Comments =====================================

export function noticeCommentsGet(req, res) {
  const { id } = req.params;

  const sqlQuery = `SELECT * From comments WHERE postID=${Number(
    id
  )} AND page = 'notice' `;

  db.query(sqlQuery, (error, result) => {
    return res.send({ info: result, userID: req.session.user.id });
  });
}
export function questionCommentsGet(req, res) {
  const sqlQuery = "SELECT * From question ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
export function lifeCommentsGet(req, res) {
  const sqlQuery = "SELECT * From life ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function quoteCommentsGet(req, res) {
  const sqlQuery = "SELECT * From quote ORDER BY id DESC;";
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
