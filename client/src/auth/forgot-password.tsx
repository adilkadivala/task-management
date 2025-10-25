import { ForgotPasswordForm } from "@/components/forgot-password";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <CheckCircle2 className="size-4" />
            </div>
            TaskFlow.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <div className="bg-muted bg-linear-to-tl from-primary to-primary/30 relative hidden lg:flex items-center justify-center">
        <div className="text-primary-foreground size-96 flex items-center justify-center rounded-md">
          <CheckCircle2 className="size-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
