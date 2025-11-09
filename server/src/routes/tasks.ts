import express, { Router } from "express";
import {
  createTask,
  viewTasks,
  updateTask,
  deleteTask,
  filterTask,
  searchTask,
  assignTask,
  unassignTask,
  createTaskOfTeam,
  updateTaskOfTeam,
  getTasksOfTeam,
  getSpecificTaskOfTeam,
} from "../controller/tasks";
import { authMiddleware } from "../middleware/auth";
import { requireAdmin } from "../middleware/role";
const taskRouter: Router = express.Router();

// /api/v1/task
//   ├── create/team/task       [POST]  // done
//   ├── update/team/taskId       [PUT] // done
//   ├── fetch/team/taskId  // perticuler   [GET] // done
//   ├── fetch/team/tasks  //all       [GET]  // done
//   ├── delete/team/taskId       [DELETE] 
//   ├── assign/:taskId       [POST]         // done
//   ├── unassign/:taskId/:userId [DELETE] // done
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
  .get(authMiddleware, searchTask);

// create a task of team
taskRouter
  .route("/api/v1/create-task-of-team/:teamId")
  .post(authMiddleware, requireAdmin, createTaskOfTeam);

// get all tasks
taskRouter
  .route("/api/v1/get-all-task-of-team/:teamId")
  .get(authMiddleware, requireAdmin, getTasksOfTeam);

// get a specific task
taskRouter
  .route("/api/v1/get-specific-task-of-team/:teamId/:taskId")
  .get(authMiddleware, requireAdmin, getSpecificTaskOfTeam);

// update a task of team
taskRouter
  .route("/api/v1/update-task-of-team/:teamId/:taskId")
  .put(authMiddleware, requireAdmin, updateTaskOfTeam);

// assign a task
taskRouter
  .route("/api/v1/assign-task/:teamId/:taskId/:memberId")
  .post(authMiddleware, requireAdmin, assignTask);
// assign a task
taskRouter
  .route("/api/v1/unassign-task/:teamId/:taskId/:memberId")
  .delete(authMiddleware, requireAdmin, unassignTask);

export default taskRouter;
