import express from "express";
import cors from "cors";
import {
  lifeDetailGet,
  lifeGet,
  noticeCommentsGet,
  noticeDetailGet,
  noticeGet,
  profileGet,
  questionDetailGet,
  questionGet,
  quoteDetailGet,
  quoteGet,
} from "./api/get.js";
import {
  commentPost,
  lifePost,
  noticePost,
  questionPost,
  quotePost,
  userLoginPost,
  userLogout,
  userPost,
} from "./API/post.js";
import {
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

app.get("/notice", noticeGet);
app.get("/question", questionGet);
app.get("/life", lifeGet);
app.get("/quote", quoteGet);

app.get("/notice/:id/comments", noticeCommentsGet);
app.get("/notice/:id", noticeDetailGet);
app.get("/question/:id", questionDetailGet);
app.get("/life/:id", lifeDetailGet);
app.get("/quote/:id", quoteDetailGet);

app.get("/profile", profileGet);

// ============================== POST 요청 =========================================

app.post("/notice", noticePost);
app.post("/question", questionPost);
app.post("/life", lifePost);
app.post("/quote", quotePost);
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

// ============================== PATCH 요청 ========================================

app.patch("/notice/:id", noticePatch);
app.patch("/question/:id", questionPatch);
app.patch("/life/:id", lifePatch);
app.patch("/quote/:id", quotePatch);

app.patch("/profile", profilePatch);
app.patch("/passWord", passWordChangePatch);

app.listen(8000, () => console.log("서버가 작동 중입니다!"));
