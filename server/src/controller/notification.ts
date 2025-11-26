import { Request, Response, NextFunction } from "express";
import { Notification } from "../models/notification";

// get all notification
const getAllNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const allNotifications = await Notification.find({ userId })
      .populate("fromId", "name email")
      .populate("taskId", "title")
      .populate("commentId", "message")
      .sort({ createdAt: -1 });

    if (!allNotifications.length) {
      return res.status(200).json({
        message: "No notifications yet",
      });
    }

    return res.status(200).json({
      message: "Your notifications",
      notifications: allNotifications,
    });
  } catch (error) {
    next(error);
  }
};

// get all unread notification
const getAllUnreadNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const allUnreadNotifications = await Notification.find({
      userId,
      isRead: false,
    })
      .populate("fromId", "name email")
      .populate("taskId", "title")
      .populate("commentId", "message")
      .sort({ createdAt: -1 });

    if (!allUnreadNotifications.length) {
      return res.status(200).json({
        message: "No any unread notifications yet",
      });
    }

    return res.status(200).json({
      message: "Your notifications",
      notifications: allUnreadNotifications,
    });
  } catch (error) {
    next(error);
  }
};

// make read one by id
const makeReadOneNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { taskId } = req.params;

    const getUnreadComment = await Notification.exists({
      userId,
      taskId,
      isRead: false,
    });

    if (!getUnreadComment) {
      return res.status(200).json({
        message: "No any unread notifications yet",
      });
    }

    await Notification.updateMany(
      {
        userId: userId,
        taskId: taskId,
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    return res.status(200).json({
      message: "Your notifications read",
    });
  } catch (error) {
    next(error);
  }
};

// make read all notification
const makeReadAllNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const getUnreadComment = await Notification.exists({
      userId,
      isRead: false,
    });

    if (!getUnreadComment) {
      return res.status(404).json({
        message: "No unread notifications yet",
      });
    }

    await Notification.updateMany(
      {
        userId: userId,
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    return res.status(200).json({
      message: "Your notifications read",
    });
  } catch (error) {
    next(error);
  }
};

// delete one notification
const deleteOneNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { notificationId } = req.params;

    const isNotificationExist = await Notification.exists({
      _id: notificationId,
      userId,
    });

    if (!isNotificationExist) {
      return res.status(404).json({
        message: "Notification not exist yet",
      });
    }

    await Notification.deleteOne({
      _id: notificationId,
      userId: userId,
    });

    return res.status(200).json({
      message: "Your notification is deleted",
    });
  } catch (error) {
    next(error);
  }
};

// delete all notification
const deleteAllNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { notificationIds } = req.body;

    if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
      return res.status(400).json({
        message: "notificationIds must be a non-empty array",
      });
    }

    const isNotificationExist = await Notification.exists({
      _id: { $in: notificationIds },
      userId,
    });

    if (!isNotificationExist) {
      return res.status(404).json({
        message: "Notification not exist yet",
      });
    }

    await Notification.deleteMany({
      _id: { $in: notificationIds },
      userId: userId,
    });

    return res.status(200).json({
      message: "Your notification is deleted",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllNotification,
  getAllUnreadNotification,
  makeReadOneNotification,
  makeReadAllNotifications,
  deleteOneNotification,
  deleteAllNotifications,
};
