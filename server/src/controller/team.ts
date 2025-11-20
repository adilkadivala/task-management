import { NextFunction, Request, Response } from "express";
import { teamSchema, updateTeaSchema } from "../models/validator/team";
import { Team } from "../models/team";
import { Role } from "../models/role";
import { User } from "../models/user";
import mongoose from "mongoose";

// create
const createTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { name, description, members, tasks } = req.body;
    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }

    const { success } = teamSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({
        message: "Incorrect input",
      });
    }

    const existingTeam = await Team.findOne({ name, createdBy: userId });
    if (existingTeam) {
      return res.status(409).json({
        message: "You already have a team with this name",
      });
    }

    const team = await Team.create({
      name,
      description,
      createdBy: userId,
      members: members?.length ? members : [userId],
      tasks: tasks || [],
    });

    // creating a role
    try {
      await Role.create({ userId, teamId: team._id, role: "admin" });
    } catch (roleError) {
      console.error("Role creation failed:", roleError);
    }

    return res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: team,
    });
  } catch (error: any) {
    return next(error);
  }
};

// get
const getTeams = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }

    const teams = await Team.find(
      { createdBy: userId },
      {
        name: true,
        description: true,
        members: true,
        createdBy: true,
        tasks: true,
      }
    )
      .populate("createdBy", "name email")
      .populate("members", "name email")
      .lean();

    //   lean will help to convert response i plain js object from mongoose documents

    if (!teams.length) {
      return res
        .status(403)
        .json({ message: "no any teams available to desplay" });
    }
    return res.status(200).json({ message: "Your teams", teams });
  } catch (error) {
    return next(error);
  }
};

// update
const updateTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { teamId } = req.params;
    const body = req.body;

    const { success } = updateTeaSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({
        message: "Incorrect input",
      });
    }

    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }
    if (!teamId) {
      return res.status(401).json({ message: "team id not provided" });
    }

    const isTeamExist = await Team.findById(teamId);

    if (!isTeamExist) {
      return res.status(400).json({ message: "task not found" });
    }

    if (isTeamExist.createdBy.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "not authorised to modify this team" });
    }
    const updatedTeam = await Team.findByIdAndUpdate(teamId, body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "task updated successfully", data: updatedTeam });
  } catch (error) {
    next(error);
  }
};

// delete
const deleteTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { teamId } = req.params;
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      return res.status(404).json({ message: "account not found" });
    }
    if (!teamId) {
      return res.status(402).json({ message: "Params not provided" });
    }

    const isTeamExist = await Team.findById({ _id: teamId });

    if (!isTeamExist) {
      return res.status(401).json({ message: "Team not exist" });
    }

    if (isTeamExist.createdBy.toString() !== userId) {
      return res
        .status(400)
        .json({ message: "Not authorised to delete this team" });
    }

    await Team.findByIdAndDelete(teamId);
    return res.status(200).json({ message: "team deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// add member
const addMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { teamId, memberId } = req.params;
    // @ts-ignore
    const userId = req.userId;
    if (!userId) {
      return res.status(404).json({ message: "account not found" });
    }

    if (memberId === userId) {
      return res
        .status(400)
        .json({ message: "Admin is already part of this team" });
    }

    const isMemberExist = await User.findById(memberId);
    if (!isMemberExist) {
      return res.status(401).json({ message: "user not found" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(401).json({ message: "team not found" });
    }

    const alReadyMember = new mongoose.Types.ObjectId(memberId);

    if (team.members.includes(alReadyMember)) {
      return res.status(409).json({ message: "User is already a team member" });
    }

    await Role.create({ userId: memberId, teamId, role: "member" });

    await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: memberId } },
      { new: true }
    )
      .populate("members", "name email")
      .lean();
    return res.status(200).json({ message: "Member added successfully" });
  } catch (error) {
    next(error);
  }
};

// get members
const getMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { teamId } = req.params;
    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: "account not found" });
    }

    const team = await Team.findById(teamId).populate(
      "members",
      "name email role"
    );
    if (!team) {
      return res.status(401).json({ message: "team not found" });
    }
    return res.status(200).json({
      message: "Team members fetched successfully",
      members: team.members,
    });
  } catch (error) {
    next(error);
  }
};

// remove member
const removeMember = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { teamId, memberId } = req.params;
    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(404).json({ message: "account not found" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(401).json({ message: "team not found" });
    }
    if (team.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to remove members" });
    }

    const alReadyMember = new mongoose.Types.ObjectId(memberId);

    if (!team.members.includes(alReadyMember)) {
      return res.status(404).json({ message: "Member not found in team" });
    }

    await Team.findByIdAndUpdate(
      teamId,
      { $pull: { members: memberId } },
      { new: true }
    );

    await Role.deleteOne({ userId: memberId, teamId });

    return res.status(200).json({
      message: "Team member removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam,
  addMember,
  getMembers,
  removeMember,
};
