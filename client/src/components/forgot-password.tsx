import { cn } from "@/lib/utils";
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

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [otpForm, setOtpForm] = useState<boolean>(false);
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        {otpForm === true ? (
          <>
            <Field>
              <OTPForm />
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
                type="text"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <Button type="submit" onClick={() => setOtpForm(true)}>
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
