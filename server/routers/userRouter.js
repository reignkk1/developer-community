import express from "express";

import {
  uploadFile,
  userActivity,
  userAvartarUrl,
  userDelete,
  userInfoGet,
  userLogin,
  userLogout,
  userMeActivity,
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
userRouter.get("/me", userMeActivity);
userRouter.get("/avartar", userAvartarUrl);
userRouter.get("/:id", userInfoGet);
userRouter.get("/:page/:id", userActivity);

export default userRouter;
