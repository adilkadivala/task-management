// /api/v1/comment
//   ├── :taskId              [GET]  // done
//   ├── :taskId              [POST]  // done
//   ├── :taskId/:commentId   [DELETE]  // done

// 🔥 WS: join_task
// 🔥 WS: send_comment
// 🔥 WS: receive_comment

import express, { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controller/comments";
import { authMiddleware } from "../middleware/auth";
const commentRouter: Router = express.Router();

// get comment
commentRouter
  .route("/api/v1/get-comments/:taskId")
  .get(authMiddleware, getComments);

//  post comment
commentRouter
  .route("/api/v1/create-comment/:taskId")
  .post(authMiddleware, createComment);

//  delete comment
commentRouter
  .route("/api/v1/delete-comment/:taskId/:commentId")
  .delete(authMiddleware, deleteComment);

export default commentRouter;
