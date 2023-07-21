import express from 'express';
import upload from './../models/multer.js';

import {
  uploadFile,
  userActivity,
  userDelete,
  userInfoGet,
  userLogin,
  userLogout,
  loginUserInfo,
  userProfileModify,
  userSignUp,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/upload', upload.single('image'), uploadFile);
userRouter.route('/').post(userSignUp).delete(userDelete);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);
userRouter.route('/profile').patch(userProfileModify);
userRouter.get('/login-info', loginUserInfo);
userRouter.get('/:id', userInfoGet);
userRouter.get('/:page/:id', userActivity);

export default userRouter;
