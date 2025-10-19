import { Task } from "../models/tasks";
import { NextFunction, Request, Response } from "express";
import zod from "zod";

const taskSchema = zod.object({
  title: zod.string().optional(),
  description: zod.string(),
  priority: zod.enum(["Low", "Medium", "High"]),
  status: zod.enum(["Todo", "Progress", "Completed"]),
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
    if (tasks.length > 0) {
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

const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const body = req.body;
    console.log(body);
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(401).json({ message: "params not provided" });
    }

    const { success } = updateTaskSchema.safeParse(req.body);
    if (!success) {
      return res.json({
        message: "Incorrect input",
      });
    }
    const task = await Task.findOne({
      _id: taskId,
    });
    if (!task?._id) {
      return res.status(401).json({
        message: "task not found,",
      });
    }

    await Task.updateOne({ _id: taskId }, body);

    return res.status(200).json({ message: "task updated successfully" });
  } catch (error: any) {
    return next(error);
  }
};

// delete

const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(401).json({ message: "params not provided" });
    }

    const task = await Task.findOne({
      _id: taskId,
    });

    if (!task?._id) {
      return res.status(401).json({
        message: "task not found,",
      });
    }

    await Task.deleteOne({ _id: taskId });

    return res.status(200).json({ message: "task deleted successfully" });
  } catch (error: any) {
    return next(error);
  }
};

// filter
const filterTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, priority } = req.query;

    const filter: Record<string, any> = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (!status && !priority) {
      return res
        .status(400)
        .json({ message: "Please provide status or priority to filter" });
    }

    const tasks = await Task.find(filter);

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// search
const SearchTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.query;

    const search: Record<string, any> = {};
    if (title) search.title = title;
    if (description) search.description = description;

    if (!title && !description) {
      return res
        .status(400)
        .json({ message: "Please provide title or description to search" });
    }

    const tasks = await Task.find(search);

    if (!tasks.length) {
      return res.status(404).json({ message: "No tasks found" });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully",
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createTask,
  viewTasks,
  updateTask,
  deleteTask,
  filterTask,
  SearchTask,
};
