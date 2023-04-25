import express from "express";
import {
  kakaoAuth,
  managerConfirm,
  passWordChange,
  searchArticleGet,
} from "../controllers/restController.js";

//=======================================================================================

const restRouter = express.Router();

restRouter.get("/manager-confirm", managerConfirm);
restRouter.get("/search", searchArticleGet);
restRouter.patch("/password", passWordChange);
restRouter.get("/kauth", kakaoAuth);

export default restRouter;
