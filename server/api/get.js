import mysql from "mysql";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
  multipleStatements: true,
});

//=============================================================================================

// 게시물 불러오기
export function postGet(req, res) {
  const { page } = req.params;
  const sqlQuery = `SELECT * From posts WHERE page='${page}' ORDER BY date DESC;`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

// 게시물 내용 불러오기
export function postDetailGet(req, res) {
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

// 검색한 게시물 불러오기
export function searchPostGet(req, res) {
  const { keyword } = req.params;
  const sqlQuery = `SELECT * FROM posts WHERE title like '%${keyword}%'`;

  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

// 프로필 정보 불러오기
export function profileGet(req, res) {
  const {
    user: { id },
  } = req.session;

  const sqlQuery = `SELECT name,nickname FROM user WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

// 유저 정보 불러오기
export function userInfoGet(req, res) {
  const { id } = req.params;
  const sqlQuery = `SELECT * FROM user WHERE id = ${id}`;
  db.query(sqlQuery, (error, result) => {
    console.log(result);
    return res.send(result);
  });
}

// 유저 활동내역 불러오기
export function userActivity(req, res) {
  const { id, page } = req.params;
  const sqlQuery = `SELECT * From ${page} WHERE writerID = '${id}' ORDER BY date DESC`;

  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

// 페이지 댓글 정보 가져오기
export function pageCommentsGet(req, res) {
  const { id, page } = req.params;

  const sqlQuery = `SELECT * From comments WHERE postID=${Number(
    id
  )} AND page = '${page}' `;

  db.query(sqlQuery, (error, result) => {
    return res.send({ info: result, userID: req.session.user?.id });
  });
}

// 로그인 한 유저 활동내역 클릭 시
export function userMeActivity(req, res) {
  const { id } = req.session.user;
  return res.send(`/user/${id}/posts`);
}

// 관리자 확인
export function managerConfirm(req, res) {
  if (req.session.user) {
    const { manager } = req.session.user;
    return res.send(`${manager}`);
  }

  return res.send("0");
}
