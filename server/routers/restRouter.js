import express from "express";
import {
  managerConfirm,
  passWordChange,
  searchArticleGet,
  uploadFile,
} from "../controllers/restController.js";
import upload from "../multer.js";

//=======================================================================================

const restRouter = express.Router();

restRouter.get("/manager-confirm", managerConfirm);
restRouter.get("/search", searchArticleGet);
restRouter.patch("/password", passWordChange);
restRouter.post("/upload", upload.single("image"), uploadFile);

export default restRouter;
