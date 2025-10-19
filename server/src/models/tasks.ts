import mongoose from "mongoose";

const { Schema } = mongoose;
const ObjectId = Schema.ObjectId

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
    dueDate: { type: Date },
    userId: { type: ObjectId, ref: "User", required: true },
  },
  { timestamps: true } 
);

export const Task = mongoose.model("Task", TaskSchema);
