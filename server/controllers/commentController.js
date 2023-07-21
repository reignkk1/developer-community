import db from './../models/mysql.js';

// 댓글 생성
export function commentCreate(req, res) {
  const { commentText, date, postID, page, parentID } = req.body;
  const { id, nickname, avartar } = req.session.user;

  const sqlQuery = `INSERT INTO comments (text,date,postID,writerID,nickname,page,avartar,parentID) VALUES (?,?,?,?,?,?,?,?)`;

  db.query(
    sqlQuery,
    [commentText, date, postID, id, nickname, page, avartar, parentID],
    (error, result) => {
      return res.send();
    }
  );
  return res.send('');
}

// 댓글 삭제
export function commentDelete(req, res) {
  const { id } = req.params;
  const sqlQuery = `DELETE FROM comments WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

// 댓글 수정
export function commentModify(req, res) {
  const { id } = req.params;
  const { commentText } = req.body;
  const sqlQuery = `UPDATE comments SET text = '${commentText}' WHERE id =${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

// Cildren 댓글 불러오기

export function childrenCommentGet(req, res) {
  const { parentID } = req.params;
  const sqlQuery = `SELECT * FROM comments WHERE parentID = ${parentID}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}
