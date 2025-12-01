import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  deleteAllNotifications,
  deleteOneNotification,
  getAllNotification,
  getAllUnreadNotification,
  makeReadAllNotifications,
  makeReadOneNotification,
} from "../controller/notification";

const notificationRouter: Router = express.Router();

// GET     /api/v1/notifications                 → all notifications
notificationRouter
  .route("/api/v1/get-all-notifications")
  .get(authMiddleware, getAllNotification);

// GET     /api/v1/notifications/unread          → unread only
notificationRouter
  .route("/api/v1/get-all-unread-notifications")
  .get(authMiddleware, getAllUnreadNotification);

// PATCH   /api/v1/notifications/read/:id        → mark one as read
notificationRouter
  .route("/api/v1/mark-read-notification/:taskId")
  .patch(authMiddleware, makeReadOneNotification);

// PATCH   /api/v1/notifications/read-all        → mark all as read
notificationRouter
  .route("/api/v1/mark-all-read-notification")
  .patch(authMiddleware, makeReadAllNotifications);

// DELETE  /api/v1/notifications/:id             → delete one
notificationRouter
  .route("/api/v1/delet-notification/:notificationId")
  .delete(authMiddleware, deleteOneNotification);

// DELETE  /api/v1/notifications/:id             → delete all
notificationRouter
  .route("/api/v1/delet-all-notification")
  .delete(authMiddleware, deleteAllNotifications);

export default notificationRouter;
