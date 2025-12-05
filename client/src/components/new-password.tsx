import type { UserData } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { authApies } from "@/lib/auth";

export function NewPassword({ email }: { email: string }) {
  const [userData, setUserData] = useState<UserData>({
    email,
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);

  // handle update form
  const handleForm = async (e?: any) => {
    e?.preventDefault();
    setIsLoading(true);

    const result = await authApies.ResetPassword(
      userData.email,
      userData.password
    );

    if (result.ok) {
      toast.success(result.data?.message);
      toast.success("password updated successfully");
      setUserData({ email: "", password: "" });
    } else {
      if (result.status === 422) setError(result.message);
      if (result.status === 401) setUserStatus(result.message);
      if (result.status === 403) setError(result.message);
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleForm}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Update password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter a new password for your accont!
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
          </div>
          <Input
            id="password"
            placeholder="john@1234"
            type="password"
            className={`${error || "border border-rose-300"}`}
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </Field>
        <Field>
          <Button className="text-md" type="submit">
            {isLoading ? <Spinner /> : "Update"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
