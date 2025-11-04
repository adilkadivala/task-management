import mongoose from "mongoose";
import zod from "zod";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
// sign-up
export const signUpSchema = zod.object({
  name: zod.string().optional(),
  email: zod.email(),
  password: zod.string(),
});
// sign-in
export const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
});
// forgotpassword
export const fogotPasswordSchema = signUpSchema.pick({
  email: true,
});
// verify-otp
export const verifyOtpSchema = signUpSchema
  .pick({
    email: true,
  })
  .extend({
    otp: zod.string(),
  });

// update pasword
export const updatePasswordSchema = signUpSchema.pick({
  email: true,
  password: true,
});
