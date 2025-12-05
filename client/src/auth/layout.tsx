import { Workflow } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="grid min-h-screen lg:grid-cols-2 ">
        <div className="flex flex-col gap-4 p-2 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link to="/" className="flex items-center gap-2 font-medium">
              <div className="text-primary flex size-6 items-center justify-center rounded-md">
                <Workflow className="size-4" />
              </div>
              TaskFlow.
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full md:max-w-1/2">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-linear-to-tl from-accent to-accent-foreground/10  hidden lg:flex items-center justify-center overflow-hidden relative">
          <div className="top-15 left-15 w-full h-full absolute">
            <img
              src="/auth-dash.png"
              alt="dashboard-img"
              className="object-cover w-fit h-fit rounded-2xl  "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
