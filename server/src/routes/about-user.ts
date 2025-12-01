import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  about_me,
  about_user,
  assigned_me,
  handle_role,
} from "../controller/about-user";
import { requireAdmin } from "../middleware/role";

const aboutUserRouter: Router = express.Router();

// about user him-self
aboutUserRouter.route("/api/v1/about-me").get(authMiddleware, about_me);

// about specific user (admin)
aboutUserRouter
  .route("/api/v1/about-user/:teamId/:userId")
  .get(authMiddleware, requireAdmin, about_user);

// assigned me tasks
aboutUserRouter.route("/api/v1/assigned-me").get(authMiddleware, assigned_me);

// handle user role (admin)
aboutUserRouter
  .route("/api/v1/handle-role/:teamId/:userId")
  .put(authMiddleware, requireAdmin, handle_role);

export default aboutUserRouter;
