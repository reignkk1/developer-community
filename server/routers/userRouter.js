import express from "express";
import {
  userActivity,
  userDelete,
  userInfoGet,
  userLogin,
  userLogout,
  userMeActivity,
  userProfileGet,
  userProfileModify,
  userSignUp,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/").post(userSignUp).delete(userDelete);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.route("/profile").get(userProfileGet).patch(userProfileModify);
userRouter.get("/me", userMeActivity);
userRouter.get("/:id", userInfoGet);
userRouter.get("/:page/:id", userActivity);

export default userRouter;
