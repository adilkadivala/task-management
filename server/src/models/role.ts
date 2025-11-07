import mongoose from "mongoose";

const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const roleSchema = new Schema(
  {
    userId: { type: ObjectId, ref: "User", required: true },
    teamId: { type: ObjectId, ref: "Team", required: true },
    role: { type: String, enum: ["admin", "member"], default: "member" },
  },
  { timestamps: true }
);

roleSchema.index({ userId: 1, teamId: 1 }, { unique: true });
export const Role = mongoose.model("role", roleSchema);
