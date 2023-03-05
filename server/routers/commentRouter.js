import express from "express";
import {
  commentCreate,
  commentDelete,
  commentModify,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post("/", commentCreate);
commentRouter.route("/:id").delete(commentDelete).patch(commentModify);
export default commentRouter;
