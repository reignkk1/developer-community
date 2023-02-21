import express from "express";
import cors from "cors";
import {
  managerConfirm,
  pageCommentsGet,
  postDetailGet,
  postGet,
  profileGet,
  searchPostGet,
  userActivity,
  userInfoGet,
  userMeActivity,
} from "./api/get.js";
import {
  commentPost,
  postPost,
  userLoginPost,
  userLogout,
  userPost,
} from "./API/post.js";
import { commentDelete, postDelete, userDelete } from "./API/delete.js";
import {
  profilePatch,
  passWordChangePatch,
  commentTextChange,
  postPatch,
} from "./api/patch.js";
import session from "express-session";
import MySQLStore from "express-mysql-session";

//=======================================================================================

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

// 세션 설정
app.use(
  session({
    secret: "mingyeom",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// ============================== Get 요청 =========================================

app.get("/profile", profileGet);
app.get("/manager-confirm", managerConfirm);
app.get("/user-info/:id", userInfoGet);
app.get("/user/me", userMeActivity);
app.get("/user/:page/:id", userActivity);
app.get("/search/:keyword", searchPostGet);

app.get("/:page", postGet);
app.get("/:page/:id", postDetailGet);
app.get("/:page/:id/comments", pageCommentsGet);

// ============================== POST 요청 =========================================

app.post("/user", userPost);
app.post("/user/login", userLoginPost);
app.post("/user/logout", userLogout);
app.post("/comment", commentPost);
app.post("/:page", postPost);

// ============================== DELETE 요청 =======================================

app.delete("/user", userDelete);
app.delete("/comment/:id", commentDelete);
app.delete("/:page/:id", postDelete);

// ============================== PATCH 요청 ========================================

app.patch("/profile", profilePatch);
app.patch("/passWord", passWordChangePatch);
app.patch("/comment", commentTextChange);
app.patch("/:page/:id", postPatch);

//=======================================================================================

app.listen(8000, () => console.log("서버가 작동 중입니다!"));
