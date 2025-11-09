import express, { Router } from "express";
import {
  createTask,
  getTasks,
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
  getSpecificTask,
  deleteTaskOfTeam,
  taskStats,
} from "../controller/tasks";
import { authMiddleware } from "../middleware/auth";
import { requireAdmin } from "../middleware/role";
const taskRouter: Router = express.Router();

// /api/v1/task
//   ├── create/solo/task       [POST]  // done
//   ├── update/solo/taskId       [PUT]  // done
//   ├── delete/solo/taskId      [DELETE]  // done
//   ├── get/solo/taska       [GET]  // done
//   ├── get/solo/specific-task/taskId       [GET]  // done
//   ├── cerate/team/task      [PUT] // done
//   ├── update/team/taskId       [PUT] // done
//   ├── fetch/team/taskId  // perticuler   [GET] // done
//   ├── fetch/team/tasks  //all       [GET]  // done
//   ├── delete/team/taskId       [DELETE]   //done
//   ├── assign/:taskId       [POST]         // done
//   ├── unassign/:taskId/:userId [DELETE] // done
//   ├── stats                [GET]
//   ├── recent               [GET]
//   ├── activity/:taskId     [GET]

// create a task
taskRouter.route("/api/v1/create-task").post(authMiddleware, createTask);

// get all tasks
taskRouter.route("/api/v1/get-all-task").get(authMiddleware, getTasks);

// get specific tasks
taskRouter
  .route("/api/v1/get-specific-task/:taskId")
  .get(authMiddleware, getSpecificTask);

// update task
taskRouter.route("/api/v1/update-task/:taskId").put(authMiddleware, updateTask);

// delete task
taskRouter
  .route("/api/v1/delete-task/:taskId")
  .delete(authMiddleware, deleteTask);

// filter task
taskRouter
  .route("/api/v1/filter-task/:filterby")
  .get(authMiddleware, filterTask);

// search task
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

// delete a task of team
taskRouter
  .route("/api/v1/delete-task-of-team/:teamId/:taskId")
  .delete(authMiddleware, requireAdmin, deleteTaskOfTeam);

// assign a task
taskRouter
  .route("/api/v1/assign-task/:teamId/:taskId/:memberId")
  .post(authMiddleware, requireAdmin, assignTask);
// un-assign a task
taskRouter
  .route("/api/v1/unassign-task/:teamId/:taskId/:memberId")
  .delete(authMiddleware, requireAdmin, unassignTask);

// task stats
taskRouter.route("/api/v1/task-stats").get(authMiddleware, taskStats);

export default taskRouter;
