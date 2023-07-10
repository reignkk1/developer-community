import express from "express";

import {
  uploadFile,
  userActivity,
  userDelete,
  userInfoGet,
  userLogin,
  userLogout,
  loginUserInfo,
  userProfileGet,
  userProfileModify,
  userSignUp,
} from "../controllers/userController.js";

import upload from "./../multer.js";

const userRouter = express.Router();

userRouter.post("/upload", upload.single("image"), uploadFile);
userRouter.route("/").post(userSignUp).delete(userDelete);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.route("/profile").get(userProfileGet).patch(userProfileModify);
userRouter.get("/login-info", loginUserInfo);
userRouter.get("/:id", userInfoGet);
userRouter.get("/:page/:id", userActivity);

export default userRouter;
