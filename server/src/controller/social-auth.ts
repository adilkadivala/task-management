import { User } from "../models/user";
import jwt from "jsonwebtoken";
import incrypt from "bcryptjs";

const AUTH_SECRET = process.env.AUTH_SECRET!;
const BCRYPT_SALT = process.env.BCRYPT_SALT!;

export const socialLoginController = async ({ user, account }: any) => {
  let existing = await User.findOne({ email: user.email });

  const hashPass = await incrypt.hash("social-login", Number(BCRYPT_SALT));

  if (!existing) {
    existing = await User.create({
      name: user.name,
      email: user.email,
      password: hashPass,
      provider: account.provider,
    });
  }

  const token = jwt.sign(
    {
      id: existing._id.toString(),
    },
    AUTH_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user: existing };
};
