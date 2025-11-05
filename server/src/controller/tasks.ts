import { Task } from "../models/tasks";
import { taskSchema, updateTaskSchema } from "../models/validator/tasks";
import { NextFunction, Request, Response } from "express";

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
      return res.status(422).json({
        message: "Incorrect input",
      });
    }

    const newTask = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      userId,
    });
    return res
      .status(200)
      .json({ message: "task created successfully", data: newTask });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: true,
        message: "task with this title already exists for this user",
      });
    }
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
    // @ts-ignore
    const userId = req.userId;
    const tasks = await Task.find({ userId }).lean();
    if (!tasks.length) {
      return res
        .status(403)
        .json({ message: "no any task availabke to display" });
    }
    return res.status(200).json({ message: "Your tasks", tasks });
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
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ message: "params not provided" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        message: "task not found,",
      });
    }
    // @ts-ignore
    if (task.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    const { success } = updateTaskSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({
        message: "Incorrect input",
      });
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "task updated successfully", data: updatedTask });
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
      return res.status(404).json({ message: "params not provided" });
    }

    const task = await Task.findById({
      _id: taskId,
    });

    if (!task) {
      return res.status(404).json({
        message: "task not found,",
      });
    }

    // @ts-ignore
    if (task.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({ message: "task deleted successfully" });
  } catch (error: any) {
    return next(error);
  }
};

// filter
const filterTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, priority } = req.query;
    // @ts-ignore
    const userId = req.userId;
    const filter: Record<string, any> = { userId };

    if (status) filter.status = new RegExp(status.toString(), "i");
    if (priority) filter.priority = new RegExp(priority.toString(), "i");

    if (typeof status !== "string" && typeof priority !== "string") {
      return res.status(400).json({
        message: "Invalid query parameters. Use ?status=Todo or ?priority=High",
      });
    }

    if (!status && !priority) {
      return res
        .status(400)
        .json({ message: "Please provide status or priority to filter" });
    }

    const tasks = await Task.find(filter).sort({ updatedAt: -1 });

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
    // @ts-ignore
    const userId = req.userId;
    const search: Record<string, any> = { userId };
    if (title) search.title = new RegExp(title.toString(), "i");
    if (description)
      search.description = new RegExp(description.toString(), "i");

    if (typeof title !== "string" && typeof description !== "string") {
      return res.status(400).json({
        message:
          "Invalid query parameters. Use ?title=Go to Gym or ?description= Gym",
      });
    }

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
