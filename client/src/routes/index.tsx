import ForgotPassword from "@/auth/forgot-password";
import SignIn from "@/auth/sign-in";
import SignUp from "@/auth/sign-up";
import LandingPage from "@/pages/landing-page";
import { Route, Routes } from "react-router-dom";

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Paths;
