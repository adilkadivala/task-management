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

    const userDetail = await User.findById(userId, {
      name: true,
      email: true,
    });

    const userTeam = await Team.find({ members: userId });

    const userRole = await Role.find(
      {
        teamId: userTeam,
        userId: userId,
      },
      { userId: true, teamId: true, role: true }
    )
      .populate("teamId", "name description")
      .populate("userId", "name email");

    const userSoloTasks = await Task.find({ userId: userId, teamId: null });

    const userAssignedTasks = await Task.find({
      assignedTo: userId,
      teamId: { $ne: null },
    })
      .populate("teamId", "name members")
      .lean();

    const validAssignedTasks = userAssignedTasks.filter((task) => {
      const team: any = task.teamId;
      return team?.members?.some((m: any) => m.toString() === userId);
    });

    const aboutMe = {
      detail: userDetail,
      role: userRole,
      teams: userTeam,
      soloTasks: userSoloTasks,
      assignedTasks: validAssignedTasks,
    };

    if (!userDetail) {
      return res.status(404).json({ message: "profile not found" });
    }
    return res.status(200).json({ message: "user profile", aboutMe });
  } catch (error: any) {
    return next(error);
  }
};

// about-specific user of the team
const about_user = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // @ts-ignore
    const adminId = req.userId;
    const { userId } = req.params;

    // user basic detail
    const userDetail = await User.findById(userId, {
      name: true,
      email: true,
    });

    // is user member of any team
    const isUserMemberOftheTeam = await Team.findOne({
      createdBy: adminId,
      members: userId,
    });
    if (!isUserMemberOftheTeam) {
      return res
        .status(404)
        .json({ message: "User is not member of the team!" });
    }

    // user orle
    const userRole = await Role.findOne({
      teamId: isUserMemberOftheTeam._id,
      userId: userId,
    });

    const userSoloTasks = await Task.find({ userId: userId, teamId: null });

    const userAssignedTasks = await Task.find({
      assignedTo: userId,
      teamId: { $ne: null },
    })
      .populate("teamId", "name members")
      .lean();

    const validAssignedTasks = userAssignedTasks.filter((task) => {
      const team: any = task.teamId;
      return team?.members?.some((m: any) => m.toString() === userId);
    });

    const about_user = {
      detail: userDetail,
      user_role: userRole,
      teams: isUserMemberOftheTeam,
      soloTasks: userSoloTasks,
      assignedTasks: validAssignedTasks,
    };

    if (!userDetail) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    return res.status(200).json({ message: "user profile", about_user });
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

    const assignedTasks = await Task.find(
      { assignedTo: userId, teamId: { $ne: null } },
      {
        title: true,
        description: true,
        priority: true,
        status: true,
        teamId: true,
      }
    )
      .populate("assignedTo", "name email")
      .populate("teamId", "name description members");

    const validTeamTasks = assignedTasks.filter((task) => {
      const team = task.teamId as any;
      return team.members.some((m: any) => m.toString() === userId);
    });

    if (validTeamTasks.length === 0) {
      return res.status(201).json({
        message: "You're not assigned to any team tasks",
        assignedTasks: [],
      });
    }

    return res.status(200).json({
      message: "Your assigned team tasks",
      assignedTasks: validTeamTasks,
    });
  } catch (error) {
    next(error);
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

    // 1. Check team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team doesn't exist" });
    }

    // 2. Check target user is a member of the team
    const isMember = await Team.findOne({
      _id: teamId,
      members: userId,
    });

    if (!isMember) {
      return res
        .status(401)
        .json({ message: "User is not a member of this team" });
    }

    // 3. Prevent admin modifying themselves
    if (userId === adminId) {
      return res
        .status(402)
        .json({ message: "You cannot change your own role" });
    }

    // 4. Prevent altering team creator
    if (userId === team.createdBy.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot modify the team creator's role" });
    }

    // 5. Fetch role record
    const role = await Role.findOne({ userId, teamId });
    if (!role) {
      return res.status(403).json({ message: "Role record not found" });
    }

    // 6. Prevent removing last admin
    if (role.role === "admin") {
      const adminCount = await Role.countDocuments({
        teamId,
        role: "admin",
      });

      if (adminCount <= 1) {
        return res.status(405).json({
          message: "Cannot remove the last admin of the team",
        });
      }
    }

    // 7. Toggle role
    const newRole = role.role === "admin" ? "member" : "admin";
    role.role = newRole;

    return res.status(200).json({
      message: "User role updated successfully",
      updatedRole: {
        userId,
        teamId,
        newRole,
      },
    });
  } catch (error) {
    return next(error);
  }
};


export { about_me, about_user, assigned_me, handle_role };
