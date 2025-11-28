import { User } from "../models/user";
import jwt from "jsonwebtoken";

const AUTH_SECRET = process.env.AUTH_SECRET!;

export const socialLoginController = async ({ user, account }: any) => {
  let existing = await User.findOne({ email: user.email });

  if (!existing) {
    existing = await User.create({
      name: user.name,
      email: user.email,
      password: "social-login",
      provider: account.provider,
    });
  }

  const token = jwt.sign(
    {
      id: existing._id,
      email: existing.email,
    },
    AUTH_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user: existing };
};
