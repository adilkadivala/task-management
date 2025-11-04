import mongoose from "mongoose";
const { Schema } = mongoose;

const otpSchema = new Schema(
  {
    otp: { type: String },
    expiresAt: { type: Date, require: true, index: { expires: 0 } },
    email: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", otpSchema);
