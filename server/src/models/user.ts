import mongoose from "mongoose";

const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    teams: [{ type: ObjectId, ref: "Team" }],
    tasks: [{ type: ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
