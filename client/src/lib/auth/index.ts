import axios from "axios";
import type { UserData } from "../utils";

class Auth {
  private server_api = import.meta.env.VITE_SERVER_ROOT_API;

  // sign-in
  async SignIn(userDetail: UserData) {
    try {
      const response = await axios.post(
        `${this.server_api}/auth/api/v1/sign-in`,
        { ...userDetail }
      );
      localStorage.setItem("token", response.data.token);
      return { ok: true, data: response.data, token: response.data.token };
    } catch (error: any) {
      console.log(error);
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";
      return { ok: false, status, message };
    }
  }
  // sign-up
  async SignUp(userDetail: UserData) {
    try {
      const response = await axios.post(
        `${this.server_api}/auth/api/v1/sign-up`,
        { ...userDetail }
      );
      return { ok: true, data: response.data };
    } catch (error: any) {
      console.log(error);
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";
      return { ok: false, status, message };
    }
  }
  // forgot-password
  async ForgotPassword(email: string) {
    try {
      const response = await axios.post(
        `${this.server_api}/auth/api/v1/forgot-password`,
        { email }
      );

      return { ok: true, data: response.data };
    } catch (error: any) {
      console.log(error);
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";
      return { ok: false, status, message };
    }
  }
  // reset-password
  async VarifyOtp(email: string, otp: string) {
    try {
      await axios.post(`${this.server_api}/auth/api/v1/verify-otp`, {
        email,
        otp,
      });

      return {
        ok: true,
        data: {
          message: "OTP verified!",
        },
      };
    } catch (error: any) {
      console.log(error);
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";
      return { ok: false, status, message };
    }
  }
  // reset-password
  async ResetPassword(email: string, password: string) {
    try {
      const response = await axios.post(
        `${this.server_api}/auth/api/v1/reset-password`,
        { email, password }
      );
      console.log(response.data);
      return {
        ok: true,
        data: {
          message: "OTP verified!",
        },
      };
    } catch (error: any) {
      console.log(error);
      const status = error.response?.status;
      const message = error.response?.data?.message || "Something went wrong";
      return { ok: false, status, message };
    }
  }
  //   delete account
  async DeleteAccount() {
    try {
      const response = await axios.delete(
        `${this.server_api}/auth/api/v1/delete-account`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const authApies = new Auth();
