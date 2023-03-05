import express from "express";
import {
  articleCreate,
  articleAllGet,
  articleModify,
  articleDelete,
  articleGet,
  articleCommentsGet,
} from "../controllers/articleController.js";

const articleRouter = express.Router();

articleRouter.get("/:page/:id/comments", articleCommentsGet);
articleRouter
  .route("/:page/:id")
  .get(articleGet)
  .delete(articleDelete)
  .patch(articleModify);
articleRouter.route("/:page").get(articleAllGet).post(articleCreate);

export default articleRouter;
