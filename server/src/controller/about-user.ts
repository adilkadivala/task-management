import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { Team } from "../models/team";
import { Task } from "../models/tasks";
import { Role } from "../models/role";

// about-me
const about_me = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const isUserExist = await User.findById(userId, {
      name: true,
      email: true,
      role: true,
      teams: true,
      tasks: true,
    })
      .populate("teams", "name description")
      .populate("tasks", "title description priority status");

    if (!isUserExist) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    return res.status(200).json({ message: "user profile", isUserExist });
  } catch (error: any) {
    return next(error);
  }
};

// about-specific user
const about_user = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // @ts-ignore
    const adminId = req.userId;
    const { userId } = req.params;

    const isUserExist = await User.findById(userId, {
      name: true,
      email: true,
      role: true,
      teams: true,
      tasks: true,
    })
      .populate("teams", "name description")
      .populate("tasks", "title description priority status");

    if (!isUserExist) {
      return res.status(403).json({ message: "User doesn't exist" });
    }

    const isUserMemberOftheTeam = await Team.findOne({
      createdBy: adminId,
      members: userId,
    });
    if (!isUserMemberOftheTeam) {
      return res
        .status(401)
        .json({ message: "User is not member of the team!" });
    }

    return res.status(200).json({ message: "user profile", isUserExist });
  } catch (error: any) {
    return next(error);
  }
};

// assigned me tasks
const assigned_me = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const isUserExist = await User.findById(userId);

    if (!isUserExist) {
      return res.status(403).json({ message: "User doesn't exist" });
    }

    const assignedTasks = await Task.find(
      { assignedTo: userId },
      { title: true, description: true, priority: true, status: true }
    )
      .populate("assignedTo", "name email")
      .populate("teamId", "name description");

    if (!assignedTasks.length) {
      return res.status(200).json({ message: "you're not assigned any task" });
    }
    return res
      .status(200)
      .json({ message: "your assigned tasks", assignedTasks });
  } catch (error: any) {
    return next(error);
  }
};

// role management
const handle_role = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // @ts-ignore
    const adminId = req.userId;
    const { userId, teamId } = req.params;

    // check is team exist or not
    const isTeamExist = await Team.findById(teamId);

    if (!isTeamExist) {
      return res.status(403).json({ message: "Team doesn't exist" });
    }

    // check the user is member of the team or not
    const isUserMemberOftheTeam = await Team.findOne({
      createdBy: adminId,
      members: userId,
    });

    if (!isUserMemberOftheTeam) {
      return res
        .status(401)
        .json({ message: "User is not member of the team!" });
    }

    const user = await User.findById(userId);
    const role = await Role.findOne({ userId, teamId });

    const userRole = user?.role === "admin" ? "user" : "admin";
    const teamRole = role?.role === "admin" ? "member" : "admin";
    // update the suer role
    await User.updateOne({ _id: userId, teams: teamId }, { role: userRole });
    await Role.updateOne({ userId, teamId }, { role: teamRole });

    return res.status(200).json({ message: "user role is updated", user });
  } catch (error: any) {
    return next(error);
  }
};

export { about_me, about_user, assigned_me, handle_role };
