import express from 'express';
import {
  kakaoAuth,
  managerConfirm,
  passWordChange,
  searchArticleGet,
  uploadImage,
} from '../controllers/restController.js';
import upload from '../models/multer.js';

//=======================================================================================

const restRouter = express.Router();

restRouter.get('/manager-confirm', managerConfirm);
restRouter.get('/search', searchArticleGet);
restRouter.patch('/password', passWordChange);
restRouter.get('/kauth', kakaoAuth);
restRouter.post('/uploadImage', upload.single('image'), uploadImage);

export default restRouter;
