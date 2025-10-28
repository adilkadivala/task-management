import ForgotPassword from "@/auth/forgot-password";
import AuthLayout from "@/auth/layout";
import SignIn from "@/auth/sign-in";
import SignUp from "@/auth/sign-up";
import Dashboard from "@/dashboard";
import DashboardLayout from "@/dashboard/dash-layout";
import TaskManagement from "@/dashboard/task-management";
import LandingPage from "@/pages/landing-page";
import { Route, Routes } from "react-router-dom";

const Paths = () => {
  return (
    <Routes>
      {/* landing-page */}
      <Route path="/" element={<LandingPage />} />

      {/* auth */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="task-management" element={<TaskManagement />} />
        <Route path="calender" element={<Dashboard />} />
      </Route>

      {/* not-found */}
    </Routes>
  );
};

export default Paths;
