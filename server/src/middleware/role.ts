import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    // @ts-ignore
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log(user.role);
    console.log(user.name);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (error) {
    console.error("Role check error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { requireAdmin };
