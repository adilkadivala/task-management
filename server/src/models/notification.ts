import mongoose from "mongoose";
const { Schema } = mongoose;
const objectId = Schema.Types.ObjectId;

const notificationSchema = new Schema(
  {
    userId: { type: objectId, ref: "User", required: true },
    fromId: { type: objectId, ref: "User", required: true },
    taskId: { type: objectId, ref: "Task", required: true },
    commentId: { type: objectId, ref: "comment", required: true },
    type: {
      type: String,
      enum: ["comment", "task", "team"],
      default: "comment",
      required: true,
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("notification", notificationSchema);
