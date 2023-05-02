import express from "express";
import {
  childrenCommentGet,
  commentCreate,
  commentDelete,
  commentModify,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.get("/children/:parentID", childrenCommentGet);
commentRouter.post("/", commentCreate);
commentRouter.route("/:id").delete(commentDelete).patch(commentModify);
export default commentRouter;
