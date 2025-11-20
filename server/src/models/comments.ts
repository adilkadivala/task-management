import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema(
  {
    taskId: { type: ObjectId, ref: "Task", required: true },
    userId: { type: ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("comment", commentSchema);
