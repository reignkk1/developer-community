import bcryptjs from "bcryptjs";
import db from "../mysql.js";

// 비밀번호 변경 수정
export async function passWordChange(req, res) {
  const { currentPassWord, newPassWord } = req.body;

  const sqlQuery = `SELECT password FROM user WHERE id = ${req.session.user.id} `;

  db.query(sqlQuery, async (error, result) => {
    const matchPassword = await bcryptjs.compare(
      currentPassWord,
      result[0].password
    );

    if (!matchPassword) {
      return res.send("현재 비밀번호가 일치하지 않습니다.");
    } else {
      const hashPassword = await bcryptjs.hash(newPassWord, 10);
      const sqlQuery = `UPDATE user SET password='${hashPassword}' WHERE id =${req.session.user.id}`;

      db.query(sqlQuery, (error2, result2) => {
        return res.send("변경이 완료되었습니다!");
      });
    }
  });
}

// 관리자 확인
export function managerConfirm(req, res) {
  if (req.session.user) {
    const { manager } = req.session.user;
    return res.send(`${manager}`);
  }

  return res.send("0");
}

// 검색한 게시물 불러오기
export function searchArticleGet(req, res) {
  const { keyword } = req.query;
  const sqlQuery = `SELECT * FROM posts WHERE title like '%${keyword}%' ORDER BY id DESC;`;

  db.query(sqlQuery, (error, result) => {
    return res.send(result);
  });
}

// 카카오 소셜 로그인
export async function kakaoAuth(req, res) {
  const grant_type = "authorization_code";
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;
  const authCode = req.query.code;

  const KAKAO_TOKEN_URI = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${authCode}`;

  const kakaoToken = await (
    await fetch(KAKAO_TOKEN_URI, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();

  const { access_token } = kakaoToken;

  const userData = await (
    await fetch("https://kapi.kakao.com/v2/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();

  const {
    properties: { nickname, profile_image },
    id,
  } = userData;

  const selectQuery = `SELECT * FROM user WHERE userID = ${id}`;
  const signUpQuery =
    "INSERT INTO user (userID,password,email,name,nickname,create_time,avartar) VALUES (?,?,?,?,?,?,?)";

  db.query(selectQuery, (error, result) => {
    if (result[0]) {
      req.session.user = result[0];
      req.session.logined = true;
      return res.redirect("http://localhost:3000");
    }

    db.query(
      signUpQuery,
      [
        id,
        id,
        "kakao@kakao.com",
        nickname,
        nickname,
        new Date().toLocaleDateString("ko-kr"),
        profile_image,
      ],
      (error, result) => {
        db.query(selectQuery, (error, result) => {
          req.session.user = result[0];
          req.session.logined = true;
          return res.redirect("http://localhost:3000");
        });
      }
    );
  });
}
