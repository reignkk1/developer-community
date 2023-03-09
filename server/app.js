import express from "express";
import cors from "cors";
import session from "express-session";
import MySQLStore from "express-mysql-session";

// File
import userRouter from "./routers/userRouter.js";
import commentRouter from "./routers/commentRouter.js";
import restRouter from "./routers/restRouter.js";
import articleRouter from "./routers/articleRouter.js";

//=======================================================================================

const app = express();

app.use(
  cors({
    origin: "https://web-board-web-6g2llexw0nts.sel3.cloudtype.app",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const options = {
  host: "web-db.czezlldmbgmn.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "alsrua17931!",
  database: "board_DB",
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

//=======================================================================================

app.use("/", restRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use("/article", articleRouter);

//=======================================================================================

app.listen(8080, () => console.log("서버가 작동 중입니다!"));
