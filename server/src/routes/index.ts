import express, { Router } from "express";
import authRouter from "./auth";
import taskRouter from "./tasks";
import teamRouter from "./team";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/task", taskRouter);
router.use("/team", teamRouter);

export default router;
