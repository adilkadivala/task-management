import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Todo", "Progress", "Completed"],
      default: "Todo",
    },
    assignedTo: { type: ObjectId, ref: "User" },
    teamId: { type: ObjectId, ref: "Team" },
    dueDate: { type: Date },
    userId: { type: ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

TaskSchema.index({ title: 1, userId: 1 }, { unique: true });

export const Task = mongoose.model("Task", TaskSchema);
