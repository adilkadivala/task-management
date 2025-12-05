import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authApies } from "@/lib/auth";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NewPassword } from "./new-password";

export function OTPForm({ email }: { email: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | "">("");
  const [otp, setOtp] = useState<string | "">("");
  const [resetPasswordForm, setResetPasswordForm] = useState<boolean>(false);

  const handleOtp = async (e: any) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setErrorMessage("Enter 6 digit code");
      return;
    }
    setLoading(true);
    const response = await authApies.VarifyOtp(email, otp);
    setLoading(false);
    if (response.ok === true) {
      setResetPasswordForm(true);
      setOtp("");
    }
    if (response.status === 400) {
      setResetPasswordForm(false);
      setOtp("");
      setErrorMessage(response.message);
    }
    if (response.status === 401) {
      setResetPasswordForm(false);
      setErrorMessage(response.message);
      setOtp("");
    }
    if (response.status === 410) {
      setResetPasswordForm(false);
      setOtp("");
      setErrorMessage(response.message);
    }
  };

  // handle reset

  const handleReset = async () => {
    setLoading(true);
    const response = await authApies.ForgotPassword(email);
    if (response.status === 200) {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <form>
      <FieldGroup>
        {resetPasswordForm === true ? (
          <>
            <Field>
              <NewPassword email={email} />
            </Field>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-xl font-bold">Enter verification code</h1>
              <FieldDescription>
                We sent a 6-digit code to your{" "}
                <span className="text-primary">{email}</span> address
              </FieldDescription>
            </div>
            <Field className="mx-auto">
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                name="otp"
                onChange={(value) => setOtp(value)}
                required
                containerClassName="gap-4"
                className="inset-0"
              >
                <div className="flex justify-center items-center w-full">
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </div>
              </InputOTP>
              {errorMessage && (
                <span className="text-sm text-red-500">{errorMessage}</span>
              )}
              <FieldDescription className="text-center">
                Didn't receive the code?{" "}
                <Button
                  asChild
                  variant="ghost"
                  className="dark:hover:bg-none"
                  onClick={() => handleReset()}
                >
                  <Link to="#">{loading ? "sending..." : "resend"}</Link>
                </Button>
              </FieldDescription>
            </Field>
            <Field>
              <Button type="submit" onClick={handleOtp}>
                {loading ? "loading... " : "Verify"}
              </Button>
            </Field>
          </>
        )}
      </FieldGroup>
    </form>
  );
}
