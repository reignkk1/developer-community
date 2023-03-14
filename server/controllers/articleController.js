import db from "../mysql.js";

// 모든 게시물 불러오기
export function articleAllGet(req, res) {
  const { page } = req.params;

  const sqlQuery = `SELECT * From posts WHERE page='${page}' ORDER BY id DESC;`;
  db.query(sqlQuery, (error, result) => {
    try {
      return res.send({ result, logined: req.session.logined });
    } catch (error) {
      console.log(error);
      return res.status(404).send();
    }
  });
}

// 특정 게시물 불러오기
export function articleGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM posts WHERE id = ${id}`;

  db.query(sqlQuery, (error, result) => {
    try {
      return res.send({
        result,
        writerMatch: req.session?.user?.id === result[0].writerID,
        logined: req.session.logined,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send();
    }
  });
}

// 특정 게시물 댓글들 불러오기
export function articleCommentsGet(req, res) {
  const { id, page } = req.params;

  const sqlQuery = `SELECT * From comments WHERE postID=${Number(
    id
  )} AND page = '${page}' `;

  db.query(sqlQuery, (error, result) => {
    try {
      if (result[0] === undefined) return res.send("false");
      return res.send({ info: result, userID: req.session.user?.id });
    } catch (error) {
      console.log(error);
      return res.status(404).send();
    }
  });
}

// 게시물 생성
export function articleCreate(req, res) {
  const { title, content, date } = req.body;
  const { page } = req.params;
  const { id, nickname } = req.session.user;

  const sqlQuery =
    "INSERT INTO posts (title,content,date,writerID,nickname,page) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlQuery,
    [title, content, date, id, nickname, page],
    (error, result) => {
      return res.send("성공!");
    }
  );
}

// 게시물 삭제
export function articleDelete(req, res) {
  const { id } = req.params;
  const sqlQuery = `DELETE FROM posts WHERE id = ${id};
                      DELETE FROM comments WHERE postID = ${id};`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

// 게시물 수정
export function articleModify(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const sqlQuery = `UPDATE posts SET title="${title}",content="${content}" WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    res.send("성공!");
  });
}
