import mysql from "mysql";
// 125.142.99.87
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
  multipleStatements: true,
});

export function articleGet(req, res) {
  const { page } = req.params;
  const sqlQuery = `SELECT * From posts WHERE page='${page}' ORDER BY date DESC;`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function articleDetailGet(req, res) {
  const { id } = req.params;

  const sqlQuery = `SELECT * FROM posts WHERE id = ${id}`;

  db.query(sqlQuery, (error, result) => {
    if (req.session.user) {
      const { id } = req.session.user;
      if (id === result[0].writerID) {
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

export function userArticleGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * From notice WHERE writerID = '${id}';
  SELECT * From question WHERE writerID = '${id}'; 
  SELECT * From life WHERE writerID = '${id}'; 
  SELECT * From quote WHERE writerID = '${id}';
  `;

  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

export function userCommentGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * From comments WHERE writerID = '${id}'  ORDER BY date DESC;`;

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
    return res.send({ info: result, userID: req.session.user?.id });
  });
}
export function questionCommentsGet(req, res) {
  const { id } = req.params;

  const sqlQuery = `SELECT * From comments WHERE postID=${Number(
    id
  )} AND page = 'question' `;

  db.query(sqlQuery, (error, result) => {
    return res.send({ info: result, userID: req.session.user?.id });
  });
}
export function lifeCommentsGet(req, res) {
  const { id } = req.params;

  const sqlQuery = `SELECT * From comments WHERE postID=${Number(
    id
  )} AND page = 'life' `;

  db.query(sqlQuery, (error, result) => {
    return res.send({ info: result, userID: req.session.user?.id });
  });
}

export function quoteCommentsGet(req, res) {
  const { id } = req.params;

  const sqlQuery = `SELECT * From comments WHERE postID=${Number(
    id
  )} AND page = 'quote' `;

  db.query(sqlQuery, (error, result) => {
    return res.send({ info: result, userID: req.session.user?.id });
  });
}

export function userMeActivity(req, res) {
  const { id } = req.session.user;
  return res.send(`/user/${id}/article`);
}
