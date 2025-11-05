import zod from "zod";

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
