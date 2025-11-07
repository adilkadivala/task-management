import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    members: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    tasks: [
      {
        type: ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);
