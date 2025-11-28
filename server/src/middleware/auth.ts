import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Make sure AUTH_SECRET is defined
const AUTH_SECRET = process.env.AUTH_SECRET as string;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({ message: "Unauthorized header! Please create account" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, AUTH_SECRET);

    if (decoded) {
    // @ts-ignore
      req.userId = decoded.id;
      next();
      return;
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

export { authMiddleware };
