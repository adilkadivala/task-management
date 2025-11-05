import { generateOtp } from "../utils/generate-otp";
import incrypt from "bcryptjs";
import { Otp } from "../models/otp";
const BCRYPT_SALT = process.env.BCRYPT_SALT!;

// generate and hashed
export const generate = async (email: string) => {
  const geneartedOtp = generateOtp();

  const hashedOpt = await incrypt.hash(geneartedOtp, Number(BCRYPT_SALT));
  await Otp.create({
    otp: hashedOpt,
    email,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
  return geneartedOtp;
};

// verify

export const check = async (otp: string, email: string) => {
  const otpRecord = await Otp.findOne({
    email,
  });

  if (!otpRecord) {
    return {status: 401, message: "User doesn't exist" };
  }
  const compareOtp = await incrypt.compare(otp, otpRecord.otp!);
  if (!compareOtp) return { status: 400, message: "Incorrect OTP" };

  //   check whether otp expired or not
  const isExpired = otpRecord.expiresAt!.getTime() < Date.now();
  if (isExpired) {
    return { status: 410, message: "OTP expired" };
  }
  //   update otp status ;; varified
  otpRecord.isVerified = true;
  await otpRecord.save();
  return { status: 200, message: "OTP verified successfully" };
};
