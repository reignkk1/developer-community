import express from "express";
import {
  managerConfirm,
  passWordChange,
  searchArticleGet,
  uploadFile,
} from "../controllers/restController.js";

//=======================================================================================

const restRouter = express.Router();

restRouter.get("/manager-confirm", managerConfirm);
restRouter.get("/search", searchArticleGet);
restRouter.patch("/password", passWordChange);
restRouter.post("/upload", uploadFile);

export default restRouter;
