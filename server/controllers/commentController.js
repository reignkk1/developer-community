import db from "../mysql.js";

// 댓글 생성
export function commentCreate(req, res) {
  const { commentText, date, postID, page } = req.body;
  const { id, nickname } = req.session.user;

  console.log(commentText, date, postID, page);

  const sqlQuery = `INSERT INTO comments (text,date,postID,writerID,nickname,page) VALUES (?,?,?,?,?,?)`;

  db.query(
    sqlQuery,
    [commentText, date, postID, id, nickname, page],
    (error, result) => {
      console.log(error);
      return res.send();
    }
  );
  return res.send("");
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
