import { server_api, type UserData } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { authApies } from "@/lib/auth";
import { useAuthStore } from "@/store/auth-store";

export function SingIn() {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [credentialStatus, setCredentialStatus] = useState<string | null>(null);

  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  // handle login form
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await authApies.SignIn(userData);

    if (result.ok) {
      toast.success(result.data.message);
      setAuth(result.data.token);
      navigate("/dashboard");
      setUserData({ email: "", password: "" });
    } else {
      if (result.status === 422) setError(result.message);
      if (result.status === 401) setUserStatus(result.message);
      if (result.status === 403) setCredentialStatus(result.message);
    }

    setIsLoading(false);

    setTimeout(() => {
      setError(null);
      setCredentialStatus(null);
    }, 1000);
  };

  // social auth
  const loginWithGoogle = () => {
    window.location.href = `${server_api}/social-auth/signin/google`;
  };

  const loginWithGitHub = () => {
    window.location.href = `${server_api}/social-auth/signin/github`;
  };

  return (
    <form onSubmit={handleForm}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field className="relative">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          {error && (
            <span className="text-lg text-rose-600 absolute left-12">*</span>
          )}
          {userStatus && (
            <span className="text-sm text-rose-600 absolute left-12">
              Not found
            </span>
          )}

          <Input
            id="email"
            value={userData.email}
            className={`${error || (userStatus && "border border-rose-300")}`}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="email"
            placeholder="john@gmail.com"
          />
        </Field>
        <Field className="relative">
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            {error && (
              <span className="text-lg text-rose-600 absolute left-16">*</span>
            )}
            {credentialStatus ? (
              <span className="text-sm text-rose-600 absolute right-0">
                credential not matched
              </span>
            ) : (
              <Link
                to={"/auth/forgot-password"}
                className="ml-auto text-muted-foreground text-sm underline-offset-4 hover:underline hover:text-primary"
              >
                Forgot your password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            placeholder="john@1234"
            type="password"
            className={`${
              error || (credentialStatus && "border border-rose-300")
            }`}
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </Field>
        <Field>
          <Button className="text-md" type="submit">
            {isLoading ? <Spinner /> : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <div className="flex items-center justify-center gap-1 w-full">
            <Button
              type="button"
              className="w-1/2"
              variant="outline"
              size="icon"
              onClick={loginWithGoogle}
            >
              Google
            </Button>
            <Button
              type="button"
              className="w-1/2"
              variant="outline"
              size="icon"
              onClick={loginWithGitHub}
            >
              Github
            </Button>
          </div>
          <FieldDescription className="text-center">
            Don't have an account?
            <Link to={"/auth/sign-up"} className="underline underline-offset-4">
              {" "}
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
