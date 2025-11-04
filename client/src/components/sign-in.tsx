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
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export function SingIn({ className, ...props }: React.ComponentProps<"form">) {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [credentialStatus, setCredentialStatus] = useState<string | null>(null);

  // handle form
  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${server_api}/auth/api/v1/sign-in`, {
        ...userData,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        setUserData({
          email: "",
          password: "",
        });
      }
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";

      if (status === 422) {
        setError(message);
      } else if (status === 401) {
        setUserStatus(message);
      } else if (status === 403) {
        setCredentialStatus(message);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError(null);
        setCredentialStatus(null);
      }, 1000);
    }
  };
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleForm}
    >
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
                className="ml-auto text-sm underline-offset-4 hover:underline"
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
            <Button className="w-1/2" variant="outline" size="icon">
              Google
            </Button>
            <Button className="w-1/2" variant="outline" size="icon">
              Github
            </Button>
          </div>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to={"/auth/sign-up"} className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
