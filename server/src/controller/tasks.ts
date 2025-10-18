import { Task } from "../models/tasks";
import { NextFunction, Request, Response } from "express";
import zod from "zod";

const taskSchema = zod.object({
  title: zod.string().optional(),
  description: zod.string(),
  priority: zod.enum(["Low", "Medium", "High"]),
  status: zod.enum(["Todo", "In Progress", "Completed"]),
  dueDate: zod.string().transform((val) => new Date(val)),
});

export const updateTaskSchema = taskSchema.partial();
type updateTaskSchema = zod.infer<typeof updateTaskSchema>;

// create

const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    // @ts-ignore
    const userId = req.userId;
    const { success } = taskSchema.safeParse(req.body);
    if (!success) {
      return res.json({
        message: "Incorrect input",
      });
    }
    const task = await Task.findOne({
      title,
    });
    if (task?._id) {
      return res.json({
        message: "This titled Task Already exist,",
      });
    }
    await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      userId,
    });
    return res.status(200).json({ message: "task created successfully" });
  } catch (error: any) {
    return next(error);
  }
};

// view

const viewTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const tasks = await Task.find();
    if (tasks) {
      return res.status(200).json(tasks);
    }
    return res
      .status(403)
      .json({ message: "no any task availabke to display" });
  } catch (error: any) {
    return next(error);
  }
};

// update

const updateTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const body = req.body;
    const { _id } = req.params;

    if (!_id) {
      return res.status(401).json({message:"params not provided"})
    }

    const { success } = updateTaskSchema.safeParse(req.body);
    if (!success) {
      return res.json({
        message: "Incorrect input",
      });
    }
    const task = await Task.findOne({
      _id,
    });
    if (!task?._id) {
      return res.status(401).json({
        message: "task not found,",
      });
    }
    await Task.updateOne(body, _id);

    return res.status(200).json({ message: "task updated successfully" });
  } catch (error: any) {
    return next(error);
  }
};
// delete
// filter
// search

export { createTask, viewTasks, updateTasks };
