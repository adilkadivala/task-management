import { User } from "../models/user";
import {
  fogotPasswordSchema,
  signInSchema,
  signUpSchema,
  updatePasswordSchema,
  verifyOtpSchema,
} from "../models/validator/user";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import incrypt from "bcryptjs";
import { check, generate } from "../services/otp";
import { sendOtpMail } from "../services/mail";
import { Otp } from "../models/otp";

const AUTH_SECRET = process.env.AUTH_SECRET!;
const BCRYPT_SALT = process.env.BCRYPT_SALT!;

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
      return res.status(422).json({
        message: "Incorrect input",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (user?._id) {
      return res.status(401).json({
        message: "User Already exist,",
      });
    }

    const hashPass = await incrypt.hash(password, Number(BCRYPT_SALT));

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

    const { success } = signInSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({
        message: "Incorrect input",
      });
    }

    const isUserExist = await User.findOne({
      email,
    });

    if (!isUserExist) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    const verifyPass = await incrypt.compare(password, isUserExist.password);

    if (verifyPass) {
      const token = jwt.sign({ id: isUserExist._id.toString() }, AUTH_SECRET);
      return res
        .status(200)
        .json({ message: "logged in successfully!!", token });
    }
    return res.status(403).json({ message: "credentials not matched" });
  } catch (error: any) {
    return next(error);
  }
};

// forgot password
const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email } = req.body;

    console.log(email);

    const { success } = fogotPasswordSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({
        message: "Incorrect input",
      });
    }

    const isUserExist = await User.findOne({
      email,
    });

    if (!isUserExist) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    const otp = await generate(email);
    console.log(otp);
    if (!otp) {
      return res.status(401).json({ message: "otp not generated" });
    }
    await sendOtpMail(email, otp);
    return res
      .status(200)
      .json({ message: "Otp for reset password sent to user email:" });
  } catch (error: any) {
    return next(error);
  }
};

// verify-otp
const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { otp, email } = req.body;
    const { success } = verifyOtpSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({
        message: "Incorrect input",
      });
    }

    const checkOtp = await check(otp, email);
    if (checkOtp.status === 400) {
      return res.status(400).json({ message: checkOtp.message });
    } else if (checkOtp.status === 401) {
      return res.status(401).json({ message: checkOtp.message });
    } else if (checkOtp.status === 410) {
      return res.status(410).json({ message: checkOtp.message });
    } else {
      return res.status(200).json({ message: checkOtp.message });
    }
  } catch (error: any) {
    return next(error);
  }
};

// update-password
const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const { success } = updatePasswordSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({
        message: "Incorrect input",
      });
    }
    // check opt status
    const findOtp = await Otp.findOne({ email });
    const isVerified = findOtp?.isVerified;

    if (isVerified !== true) {
      return res.status(400).json({ message: "Otp not varified!!" });
    }

    const hashPass = await incrypt.hash(password, Number(BCRYPT_SALT));

    await User.updateOne({ email }, { password: hashPass });
    return res.status(200).json({ message: "password updated successfully!!" });
  } catch (error: any) {
    return next(error);
  }
};

export { signUp, signIn, forgotPassword, verifyOtp, updatePassword };
