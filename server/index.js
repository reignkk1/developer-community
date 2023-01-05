import express from "express";
import cors from "cors";
import {
  lifeDetailGet,
  lifeGet,
  noticeDetailGet,
  noticeGet,
  questionDetailGet,
  questionGet,
  quoteDetailGet,
  quoteGet,
} from "./api/get.js";
import {
  lifePost,
  noticePost,
  questionPost,
  quotePost,
  userPost,
} from "./API/post.js";
import {
  lifeDelete,
  noticeDelete,
  questionDelete,
  quoteDelete,
} from "./API/delete.js";
import {
  noticePatch,
  lifePatch,
  questionPatch,
  quotePatch,
} from "./api/patch.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================== Get 요청 =========================================

app.get("/notice", noticeGet);
app.get("/question", questionGet);
app.get("/life", lifeGet);
app.get("/quote", quoteGet);

app.get("/notice/:id", noticeDetailGet);
app.get("/question/:id", questionDetailGet);
app.get("/life/:id", lifeDetailGet);
app.get("/quote/:id", quoteDetailGet);

// ============================== POST 요청 =========================================

app.post("/notice", noticePost);
app.post("/question", questionPost);
app.post("/life", lifePost);
app.post("/quote", quotePost);
app.post("/user", userPost);

// ============================== DELETE 요청 =======================================

app.delete("/notice/:id", noticeDelete);
app.delete("/question/:id", questionDelete);
app.delete("/life/:id", lifeDelete);
app.delete("/quote/:id", quoteDelete);

// ============================== PATCH 요청 ========================================

app.patch("/notice/:id", noticePatch);
app.patch("/question/:id", questionPatch);
app.patch("/life/:id", lifePatch);
app.patch("/quote/:id", quotePatch);

app.listen(8000, () => console.log("서버가 작동 중입니다!"));
