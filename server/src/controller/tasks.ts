import { Task } from "../models/tasks";
import { Team } from "../models/team";
import { taskSchema, updateTaskSchema } from "../models/validator/tasks";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

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

// get all tasks of a user
const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const tasks = await Task.findOne({ userId });
    if (!tasks) {
      return res
        .status(403)
        .json({ message: "no any task availabke to display" });
    }
    return res.status(200).json({ message: "Your tasks", tasks });
  } catch (error: any) {
    return next(error);
  }
};

// get a specific task of a user
const getSpecificTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { taskId } = req.params;
    // @ts-ignore
    const userId = req.userId;
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      return res.status(403).json({ message: "no task availabke to display" });
    }
    return res.status(200).json({ message: "Your tasks", task });
  } catch (error: any) {
    return next(error);
  }
};

// update
const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
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
): Promise<Response | void> => {
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
const filterTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
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
const searchTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
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

// create a task of team
const createTaskOfTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { teamId } = req.params;
    const { title, description, priority, status, dueDate } = req.body;

    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }

    // checking team
    const isTeamExist = await Team.findById(teamId);

    if (!isTeamExist) {
      return res.status(400).json({ message: "team not found" });
    }

    const { success } = taskSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({ message: "Invalid task input" });
    }

    const newTask = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      teamId,
      userId,
    });

    await Team.findByIdAndUpdate(teamId, {
      $addToSet: { tasks: newTask._id },
    });

    return res.status(200).json({
      message: "Task created successfully for team",
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

// get all task of team
const getTasksOfTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { teamId } = req.params;

    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }

    // checking team
    const isTeamExist = await Team.findById(teamId);

    if (!isTeamExist) {
      return res.status(404).json({ message: "team not found" });
    }

    // check the task is exist in a team or not
    const getAllTasks = await Team.findOne({ _id: teamId }).populate({
      path: "tasks",
      select: "title description status priority assignedTo",
      populate: { path: "assignedTo", select: "name email" },
    });
    if (!getAllTasks?.tasks.length) {
      return res.status(403).json({ message: "no tasks available i the team" });
    }

    return res.status(200).json({
      message: "all tasks of the team",
      data: getAllTasks.tasks,
    });
  } catch (error) {
    next(error);
  }
};

// get a specific task of team
const getSpecificTaskOfTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { teamId, taskId } = req.params;

    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }

    // checking team
    const isTeamExist = await Team.findById(teamId);

    if (!isTeamExist) {
      return res.status(404).json({ message: "team not found" });
    }

    // check the task is exist in a team or not
    const getSpecificTask = await Task.findOne({
      _id: taskId,
      teamId,
    }).populate("assignedTo", "name email");

    if (!getSpecificTask) {
      return res
        .status(403)
        .json({ message: "no tasks available in the team" });
    }

    return res.status(200).json({
      message: "here is your specific task",
      task: getSpecificTask,
    });
  } catch (error) {
    next(error);
  }
};

// update a task of team
const updateTaskOfTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { teamId, taskId } = req.params;
    const body = req.body;

    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }

    // checking team
    const isTeamExist = await Team.findById(teamId);

    if (!isTeamExist) {
      return res.status(400).json({ message: "team not found" });
    }

    const { success } = updateTaskSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({ message: "Invalid task input" });
    }

    // check the task is exist in a team or not
    const isTaskExist = await Team.findOne({ _id: teamId, tasks: taskId });
    if (!isTaskExist) {
      return res.status(403).json({ message: "task not found in the team" });
    }

    const updateTask = await Task.findByIdAndUpdate(taskId, body, {
      new: true,
    });

    return res.status(200).json({
      message: "Task updated successfully for team",
      data: updateTask,
    });
  } catch (error) {
    next(error);
  }
};

// delete a task of team
const deleteTaskOfTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { teamId, taskId } = req.params;
    const body = req.body;

    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }

    // checking team
    const isTeamExist = await Team.findById(teamId);

    if (!isTeamExist) {
      return res.status(404).json({ message: "team not found" });
    }

    // check the task is exist in a team or not
    const isTaskInTeam = await Team.findOne({ _id: teamId, tasks: taskId });
    if (!isTaskInTeam) {
      return res.status(403).json({ message: "task not found in the team" });
    }

    // delete a task of team
    await Task.findByIdAndDelete(taskId);
    await Team.findByIdAndUpdate(teamId, { $pull: { tasks: taskId } });

    return res.status(200).json({
      message: "Task deleted successfully for team",
    });
  } catch (error) {
    next(error);
  }
};

// assign a task
const assignTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { taskId, teamId, memberId } = req.params;
    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }

    // checking a task
    const isTaskExist = await Task.findById(taskId);

    if (!isTaskExist) {
      return res.status(400).json({ message: "task not found" });
    }
    if (isTaskExist.status === "Completed") {
      return res.status(409).json({ message: "task already completed !!" });
    }

    // checking team
    const isTeamExist = await Team.findById(teamId);

    if (!isTeamExist) {
      return res.status(400).json({ message: "team not found" });
    }

    const isTaskInTeam = isTeamExist.tasks.some((t) => t.toString() === taskId);
    if (!isTaskInTeam) {
      return res.status(409).json({ message: "Task not found in this team" });
    }

    if (isTaskExist.assignedTo?._id.toString() === memberId) {
      return res.status(409).json({
        message: "Task already assigned to this member",
        assignee: isTaskExist,
      });
    }

    // checking member
    const isTeamMemberInTeam = isTeamExist.members.some(
      (m) => m.toString() === memberId
    );
    if (!isTeamMemberInTeam) {
      return res.status(404).json({ message: "Member not exists in the team" });
    }

    const assignee = await Task.findByIdAndUpdate(
      taskId,
      {
        assignedTo: memberId,
        teamId,
        status: "Progress",
      },
      { new: true }
    ).populate("assignedTo", "name email");

    await Team.findByIdAndUpdate(teamId, { $addToSet: { tasks: taskId } });

    return res.status(200).json({
      message: "Task assigned successfully",
      assignedTo: assignee,
    });
  } catch (error) {
    next(error);
  }
};

// assign a task
const unassignTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { taskId, teamId, memberId } = req.params;
    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "account not found" });
    }

    // checking a task
    const isTaskExist = await Task.findById(taskId);

    if (!isTaskExist) {
      return res.status(400).json({ message: "task not found" });
    }
    if (isTaskExist.status === "Completed") {
      return res.status(409).json({ message: "task already completed !!" });
    }
    if (isTaskExist.status === "Todo") {
      return res
        .status(409)
        .json({ message: "task not Assigned to anyone !!" });
    }

    // checking team
    const isTeamExist = await Team.findById(teamId);

    if (!isTeamExist) {
      return res.status(400).json({ message: "team not found" });
    }

    const isTaskInTeam = isTeamExist.tasks.some((t) => t.toString() === taskId);
    if (!isTaskInTeam) {
      return res.status(409).json({ message: "Task not found in this team" });
    }

    // checking member
    const isTeamMemberInTeam = isTeamExist.members.some(
      (m) => m.toString() === memberId
    );
    if (!isTeamMemberInTeam) {
      return res.status(404).json({ message: "Member not exits in the team" });
    }

    const unAssigned = await Task.findByIdAndUpdate(
      taskId,
      {
        assignedTo: null,
        status: "Todo",
      },
      { new: true }
    ).populate("assignedTo", "name email");

    return res.status(200).json({
      message: "Task unassigned successfully",
      task: unAssigned,
    });
  } catch (error) {
    next(error);
  }
};

// task stats
const taskStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { teamId } = req.query;
    // @ts-ignore
    const userId = req.userId;

    console.log(userId);
    console.log(teamId);

    const filterStats = teamId
      ? { teamId: new mongoose.Types.ObjectId(teamId as string) }
      : { userId };

    console.log("User making request:", userId);
    console.log("Filter applied:", filterStats);
    const teamTasks = await Task.find(filterStats, "title teamId userId");
    console.log("Matched tasks:", teamTasks);

    const totalTasks = await Task.countDocuments(filterStats);

    if (totalTasks === 0) {
      return res
        .status(404)
        .json({ message: "no any task available to display stats" });
    }
    const completedTasks = await Task.countDocuments({
      ...filterStats,
      status: "Completed",
    });
    const todoTasks = await Task.countDocuments({
      ...filterStats,
      status: "Todo",
    });
    const inProgressTasks = await Task.countDocuments({
      ...filterStats,
      status: "Progress",
    });
    const lowPriorityTasks = await Task.countDocuments({
      ...filterStats,
      priority: "Low",
    });
    const mediumPriorityTasks = await Task.countDocuments({
      ...filterStats,
      priority: "Medium",
    });
    const highPriorityTasks = await Task.countDocuments({
      ...filterStats,
      priority: "High",
    });

    // completion rate
    const completionRate =
      totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

    const stats = {
      "total tasks": totalTasks,
      "completed tasks": completedTasks,
      "todo tasks": todoTasks,
      "in progress tasks": inProgressTasks,
      "low prority tasks": lowPriorityTasks,
      "midium priority tasks": mediumPriorityTasks,
      "high priority tasks": highPriorityTasks,
      "task completion rate": completionRate,
    };

    return res.status(200).json({
      message: "your stats here",
      stats,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createTask,
  getTasks,
  getSpecificTask,
  updateTask,
  deleteTask,
  filterTask,
  searchTask,
  createTaskOfTeam,
  getTasksOfTeam,
  getSpecificTaskOfTeam,
  updateTaskOfTeam,
  deleteTaskOfTeam,
  assignTask,
  unassignTask,
  taskStats,
};
