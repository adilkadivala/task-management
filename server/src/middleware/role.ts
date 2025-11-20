import { NextFunction, Request, Response } from "express";
import { Role } from "../models/role";

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { teamId } = req.params;
    // @ts-ignore
    const userId = req.userId;

    if (!teamId) {
      return res.status(400).json({ message: "teamId not provided" });
    }

    const role = await Role.findOne({ userId, teamId });

    if (!role) {
      return res
        .status(403)
        .json({ message: "No role found for this user in this team" });
    }

    if (role.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  } catch (error) {
    console.error("Role check error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
