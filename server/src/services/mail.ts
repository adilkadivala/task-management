import mailer from "nodemailer";
import { otpTemplate } from "../utils/mail/otp-template";

// transporter

const transporter = mailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// otp mail
export const sendOtpMail = async (email: string, otp: string) => {
  try {
    transporter.sendMail({
      from: process.env.FROM_MAIL,
      to: email,
      subject: "Your otp to reset password",
      html: otpTemplate(otp),
    });
  } catch (error) {
    return { message: " Mail transporter failed to initialize" };
  }
};
