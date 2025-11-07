// /api/v1/team
//   ├── create               [POST]
//   ├── add-member           [POST]
//   ├── members/:teamId      [GET]
//   ├── remove-member/:userId [DELETE]

import express, { Router } from "express";
import {
  addMember,
  createTeam,
  deleteTeam,
  getMembers,
  getTeams,
  removeMember,
  updateTeam,
} from "../controller/team";
import { authMiddleware } from "../middleware/auth";
import { requireAdmin } from "../middleware/role";

const teamRouter: Router = express.Router();
// create
teamRouter.route("/api/v1/create-team").post(authMiddleware, createTeam);
// read
teamRouter.route("/api/v1/list-team").get(authMiddleware, getTeams);
// update
teamRouter.route("/api/v1/update-team/:teamId").put(authMiddleware, updateTeam);
// delete
teamRouter
  .route("/api/v1/delete-team/:teamId")
  .delete(authMiddleware, deleteTeam);
// add member
teamRouter
  .route("/api/v1/add-member/:teamId/:memberId")
  .post(authMiddleware, requireAdmin, addMember);

// get member
teamRouter
  .route("/api/v1/get-members/:teamId")
  .get(authMiddleware, requireAdmin, getMembers);

// remove member
teamRouter
  .route("/api/v1/remove-member/:teamId/:memberId")
  .delete(authMiddleware, requireAdmin, removeMember);

export default teamRouter;
