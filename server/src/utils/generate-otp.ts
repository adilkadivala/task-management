import crypto from "crypto";

export const generateOtp = () => {
  let otp = crypto.randomInt(100000, 999999).toString();
  console.log("otp from crypto", otp);
  return otp;
};
