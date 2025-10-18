import express, { Router } from "express";
import { signIn, signUp } from "../controller/auth";
const authRouter:Router = express.Router()

authRouter.route("/api/v1/sign-up").post(signUp)
authRouter.route("/api/v1/sign-in").post(signIn)

export default authRouter