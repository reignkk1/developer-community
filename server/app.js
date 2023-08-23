import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';

// File
import userRouter from './routers/userRouter.js';
import commentRouter from './routers/commentRouter.js';
import restRouter from './routers/restRouter.js';
import articleRouter from './routers/articleRouter.js';

//=======================================================================================

const app = express();

app.set('trust proxy', 1);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const options = {
  host: process.env.DB_HOST,
  user: 'admin',
  password: process.env.DB_PASSWORD,
  database: 'board_DB',
  checkExpirationInterval: 3600000,
};

var sessionStore = new MySQLStore(options);

// 세션 설정
app.use(
  session({
    name: 'session',
    secret: 'mingyeom',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);

//=======================================================================================

app.use('/', restRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);
app.use('/article', articleRouter);

//=======================================================================================

app.listen(8080, () => console.log('서버가 작동 중입니다!'));
