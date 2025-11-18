import express, { Router } from "express";
import authRouter from "./auth";
import taskRouter from "./tasks";
import teamRouter from "./team";
import aboutUserRouter from "./about-user";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/task", taskRouter);
router.use("/team", teamRouter);
router.use("/about_user", aboutUserRouter);

export default router;
