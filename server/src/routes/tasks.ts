import express, { Router } from "express";
import { createTask, viewTasks, updateTasks } from "../controller/tasks";
import { authMiddleware } from "../middleware/auth";
const taskRouter: Router = express.Router();

taskRouter.route("/api/v1/create-task").post(authMiddleware, createTask);
taskRouter.route("/api/v1/view-task").get(authMiddleware, viewTasks);
taskRouter.route("/api/v1/update-task").put(authMiddleware, updateTasks);

export default taskRouter;
