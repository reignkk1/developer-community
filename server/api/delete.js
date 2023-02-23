import mysql from "mysql";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
  multipleStatements: true,
});

//=======================================================================================

// 글 삭제
export function postDelete(req, res) {
  const { id } = req.params;
  const sqlQuery = `DELETE FROM posts WHERE id = ${id};
                    DELETE FROM comments WHERE postID = ${id};`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
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

// 댓글 삭제
export function commentDelete(req, res) {
  const { id } = req.params;
  const sqlQuery = `DELETE FROM comments WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
