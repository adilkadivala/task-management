import { cn, server_api, type UserData } from "@/lib/utils";
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
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { toast } from "sonner";

export function SingUp({ className, ...props }: React.ComponentProps<"form">) {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);

  // form submittion
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${server_api}/auth/api/v1/sign-up`, {
        ...userData,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setUserData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";

      if (status === 401) {
        toast.error(message);
        setUserStatus(message);
      } else if (status === 422) {
        setError("Required");
      }
    } finally {
      setTimeout(() => {
        setError(null);
        setUserStatus(null);
      }, 1000);
      setIsLoading(false);
    }
  };

  // social auth
  const loginWithGoogle = () => {
    window.location.href = `${server_api}/social-auth/signin?provider=google`;
  };

  const loginWithGitHub = () => {
    window.location.href = `${server_api}/social-auth/signin?provider=github`;
  };

  return (
    <form onSubmit={handleForm}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create account to manage Tasks</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field className="relative">
          <FieldLabel htmlFor="name">Name</FieldLabel>
          {error && (
            <span className="text-lg text-rose-600 absolute left-12">*</span>
          )}
          <Input
            id="name"
            name="name"
            className={`${error && "border border-rose-300"}`}
            type="text"
            placeholder="john"
            value={userData.name}
            onChange={(e) => {
              setUserData({ ...userData, name: e.target.value });
            }}
          />
        </Field>
        <Field className="relative">
          <FieldLabel htmlFor="email">Email</FieldLabel>
          {error && (
            <span className="text-lg text-rose-600 absolute left-12">*</span>
          )}

          <Input
            id="email"
            name="email"
            className={`${error || (userStatus && "border border-rose-300")}`}
            type="text"
            placeholder="john@gmail.com"
            value={userData.email}
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
          {userStatus && (
            <span className="text-sm text-rose-600 absolute left-12">
              {userStatus}
            </span>
          )}
        </Field>
        <Field className="relative">
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              to={"/auth/forgot-password"}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          {error && (
            <span className="text-lg text-rose-600 absolute left-17">*</span>
          )}
          <Input
            id="password"
            name="password"
            className={`${error && "border border-rose-300"}`}
            type="text"
            placeholder="john@1234"
            value={userData.password}
            onChange={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
        </Field>
        <Field>
          <Button type="button">
            {isLoading ? <Spinner className="animate-spin" /> : "Sign Up"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <div className="flex items-center justify-center gap-1 w-full">
            <Button
              className="w-1/2"
              variant="outline"
              size="icon"
              onClick={loginWithGoogle}
            >
              Google
            </Button>
            <Button
              className="w-1/2"
              variant="outline"
              size="icon"
              onClick={loginWithGitHub}
            >
              Github
            </Button>
          </div>

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
