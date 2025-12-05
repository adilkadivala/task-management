import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { OTPForm } from "./otp-form";
import { useState } from "react";
import { authApies } from "@/lib/auth";

export function ForgotPasswordForm() {
  const [otpForm, setOtpForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const sendOtp = async (e: any) => {
    e.preventDefault();

    setOtpForm(true);
    setError(null);

    const response = await authApies.ForgotPassword(email);
    if (response.status === 200) {
      setOtpForm(true);
      setError(null);
      setEmail("");
    }
    if (response.status === 422) {
      setOtpForm(false);
      setError(response.message);
    }
    if (response.status === 404) {
      setOtpForm(false);
      setError(response.message);
    }
    if (response.status === 401) {
      setOtpForm(false);
      setError(response.message);
    }
  };

  return (
    <form>
      <FieldGroup>
        {otpForm === true ? (
          <>
            <Field>
              <OTPForm email={email} />
            </Field>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Back-up your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to back to your account
              </p>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
              {error && <span className="text-sm text-red-300">{error}</span>}
            </Field>
            <Field>
              <Button type="submit" onClick={sendOtp}>
                Send
              </Button>
            </Field>
          </>
        )}
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link to={"/auth/sign-in"} className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
