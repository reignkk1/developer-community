import express from "express";
import cors from "cors";
import {
  articleDetailGet,
  articleGet,
  lifeCommentsGet,
  noticeCommentsGet,
  profileGet,
  questionCommentsGet,
  quoteCommentsGet,
  userArticleGet,
  userCommentGet,
  userMeActivity,
} from "./api/get.js";
import {
  articlePost,
  commentPost,
  userLoginPost,
  userLogout,
  userPost,
} from "./API/post.js";
import {
  commentDelete,
  lifeDelete,
  noticeDelete,
  questionDelete,
  quoteDelete,
  userDelete,
} from "./API/delete.js";
import {
  noticePatch,
  lifePatch,
  questionPatch,
  quotePatch,
  profilePatch,
  passWordChangePatch,
  commentTextChange,
} from "./api/patch.js";
import session from "express-session";
import MySQLStore from "express-mysql-session";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const options = {
  host: "localhost",
  user: "root",
  password: "alsrua17931",
  database: "boarddb",
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: "mingyeom",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// ============================== Get 요청 =========================================

app.get("/:page", articleGet);
app.get("/:page/:id", articleDetailGet);

app.get("/notice/:id/comments", noticeCommentsGet);
app.get("/question/:id/comments", questionCommentsGet);
app.get("/life/:id/comments", lifeCommentsGet);
app.get("/quote/:id/comments", quoteCommentsGet);

app.get("/profile", profileGet);

app.get("/user/article/:id", userArticleGet);
app.get("/user/comment/:id", userCommentGet);
app.get("/user/me", userMeActivity);

// ============================== POST 요청 =========================================

app.post("/:page", articlePost);

app.post("/user", userPost);
app.post("/user/login", userLoginPost);
app.post("/user/logout", userLogout);
app.post("/comment", commentPost);

// ============================== DELETE 요청 =======================================

app.delete("/notice/:id", noticeDelete);
app.delete("/question/:id", questionDelete);
app.delete("/life/:id", lifeDelete);
app.delete("/quote/:id", quoteDelete);
app.delete("/user", userDelete);
app.delete("/comment/:id", commentDelete);

// ============================== PATCH 요청 ========================================

app.patch("/notice/:id", noticePatch);
app.patch("/question/:id", questionPatch);
app.patch("/life/:id", lifePatch);
app.patch("/quote/:id", quotePatch);

app.patch("/profile", profilePatch);
app.patch("/passWord", passWordChangePatch);
app.patch("/comment", commentTextChange);

app.listen(8000, () => console.log("서버가 작동 중입니다!"));
