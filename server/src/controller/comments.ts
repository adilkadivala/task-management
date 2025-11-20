import { NextFunction, Request, Response } from "express";
import { Comment } from "../models/comments";
import { commentSchema } from "../models/validator/comments";
import { Task } from "../models/tasks";
import { Team } from "../models/team";

// get comments
const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(404).json({ message: "task id not provided!" });
    }
    const comments = await Comment.find({
      taskId: taskId,
    })
      .populate("userId", "name email")
      .sort({ createdAt: 1 })
      .lean();

    if (!comments.length) {
      return res.status(200).json({ message: "you have not any comments yet" });
    }

    return res
      .status(200)
      .json({ message: "all comments are listed here", comments });
  } catch (error) {
    next(error);
  }
};

// post comment
const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { taskId } = req.params;
    const { message } = req.body;

    if (!taskId) {
      return res.status(404).json({ message: "task id not provided!" });
    }

    const isTaskExist = await Task.findById(taskId);

    if (!isTaskExist) {
      return res.status(404).json({ message: "task not exist!" });
    }
    if (isTaskExist.teamId === null) {
      return res.status(404).json({ message: "task has no any team!" });
    }

    const isUserInTheTeam = await Team.findOne({
      members: userId,
      _id: isTaskExist.teamId,
    });

    if (!isUserInTheTeam) {
      return res
        .status(404)
        .json({ message: "user not a member of the team!" });
    }

    const { success } = commentSchema.safeParse(req.body);
    if (!success) {
      return res.status(422).json({
        message: "Incorrect input",
      });
    }

    const comment = await Comment.create({ message, taskId, userId });

    return res.status(200).json({ message: "comment added", comment });
  } catch (error) {
    next(error);
  }
};

// delete comment
const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { taskId } = req.params;
    const { commentId } = req.params;

    if (!taskId || !commentId) {
      return res.status(404).json({ message: "params not provided!" });
    }

    //  chekcing wheter task exist or not
    const isTaskExist = await Task.findById(taskId);

    if (!isTaskExist) {
      return res.status(404).json({ message: "task not exist!" });
    }

    // checking whether comment exist or not
    const isCommentExist = await Comment.findById(commentId);

    if (!isCommentExist) {
      return res.status(404).json({ message: "comment not exist!" });
    }

    // checking comment belongs to task or not
    if (isCommentExist?.taskId.toString() !== taskId) {
      return res
        .status(404)
        .json({ message: "comment does not belong to this task!" });
    }

    // has user created it ?
    if (isCommentExist?.userId.toString() !== userId) {
      return res.status(403).json({
        message: "you have not any right to delete this, you don't own this",
      });
    }

    await Comment.deleteOne({ _id: commentId });

    return res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    next(error);
  }
};

export { getComments, createComment, deleteComment };
