import express, { Router } from "express";
import {
  forgotPassword,
  signIn,
  signUp,
  updatePassword,
  verifyOtp,
} from "../controller/auth";
const authRouter: Router = express.Router();

// sign-up
authRouter.route("/api/v1/sign-up").post(signUp);
// sign-up
authRouter.route("/api/v1/sign-in").post(signIn);
// forgot-password
authRouter.route("/api/v1/forgot-password").post(forgotPassword);
// verify-Otp
authRouter.route("/api/v1/verify-otp").post(verifyOtp);
// reset-password
authRouter.route("/api/v1/reset-password").post(updatePassword);




export default authRouter;
