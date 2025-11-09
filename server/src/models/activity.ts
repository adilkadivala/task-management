import mongoose from "mongoose";
const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const activitySchema = new Schema(
  {
    taskId: { type: ObjectId, ref: "Task", required: true },
    userId: { type: ObjectId, ref: "User", required: true },
    action: {
      type: String,
      enum: [
        "CREATED",
        "UPDATED",
        "ASSIGNED",
        "UNASSIGNED",
        "STATUS_CHANGED",
        "DELETED",
      ],
      required: true,
    },
    details: { type: String },
  },
  { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);
