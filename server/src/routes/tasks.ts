import express, { Router } from "express";
import {
  createTask,
  viewTasks,
  updateTask,
  deleteTask,
  filterTask,
  SearchTask,
} from "../controller/tasks";
import { authMiddleware } from "../middleware/auth";
const taskRouter: Router = express.Router();

// /api/v1/task
//   ├── assign/:taskId       [POST]
//   ├── unassign/:taskId/:userId [DELETE]
//   ├── stats                [GET]
//   ├── recent               [GET]
//   ├── activity/:taskId     [GET]

// create
taskRouter.route("/api/v1/create-task").post(authMiddleware, createTask);

// get
taskRouter.route("/api/v1/view-task").get(authMiddleware, viewTasks);

// update
taskRouter.route("/api/v1/update-task/:taskId").put(authMiddleware, updateTask);

// delete
taskRouter
  .route("/api/v1/delete-task/:taskId")
  .delete(authMiddleware, deleteTask);

// filter
taskRouter
  .route("/api/v1/filter-task/:filterby")
  .get(authMiddleware, filterTask);

// search
taskRouter
  .route("/api/v1/search-task/:searchby")
  .get(authMiddleware, SearchTask);

export default taskRouter;
