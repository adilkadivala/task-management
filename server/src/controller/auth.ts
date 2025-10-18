import { User } from "../models/user";
import { NextFunction, Request, Response } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import incrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET!;

const signUpSchema = zod.object({
  name: zod.string().optional(),
  email: zod.email(),
  password: zod.string(),
});

// signUp

const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { name, email, password } = req.body;

    const { success } = signUpSchema.safeParse(req.body);
    if (!success) {
      return res.json({
        message: "Incorrect input",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (user?._id) {
      return res.json({
        message: "User Already exist,",
      });
    }

    const hashPass = await incrypt.hash(password, 5);

  await User.create({
      name,
      email,
      password: hashPass,
    });

    return res.status(200).json({ message: "account created successfully" });
  } catch (error: any) {
    return next(error);
  }
};

// login
const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    const { success } = signUpSchema.safeParse(req.body);
    if (!success) {
      return res.json({
        message: "Incorrect input",
      });
    }

    const isUserExist = await User.findOne({
      email,
    });

    if (!isUserExist) {
      return res.status(403).json({ message: "User doesn't exist" });
    }

    const verifyPass = await incrypt.compare(password, isUserExist.password);

    if (verifyPass) {
      const token = jwt.sign({ id: isUserExist._id.toString() }, JWT_SECRET);
      return res
        .status(200)
        .json({ message: "logged in successfully!!", token });
    } else {
      return res.status(403).json({ message: "credentials not matched" });
    }
  } catch (error: any) {
    return next(error);
  }
};

export { signUp, signIn };
