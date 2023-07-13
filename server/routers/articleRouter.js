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
articleRouter.get("/:page/all", articleAllGet);
articleRouter.post("/:page", articleCreate);
articleRouter
  .route("/:id")
  .get(articleGet)
  .delete(articleDelete)
  .patch(articleModify);

export default articleRouter;
