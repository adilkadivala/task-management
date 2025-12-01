import axios from "axios";

class Auth {
  private server_api = import.meta.env.VITE_SERVER_ROOT_API;

  // sign-in
  async SignIn(userDetail: any) {
    try {
      const response = await axios.post(
        `${this.server_api}/auth/api/v1/sign-in`,
        { ...userDetail }
      );

      if (response.status === 422) {
        return response;
      }
      if (response.status === 401) {
        return response;
      }
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // sign-up
  async SignUp(userDetail: any) {
    try {
      const response = await axios.post(
        `${this.server_api}/auth/api/v1/sign-up`,
        { ...userDetail }
      );

      if (response.status === 422) {
        return response;
      }
      if (response.status === 401) {
        return response;
      }
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // forgot-password
  async ForgotPassword(userDetail: any) {
    try {
      const response = await axios.post(
        `${this.server_api}/auth/api/v1/forgot-password`,
        { ...userDetail }
      );

      if (response.status === 422) {
        return response;
      }
      if (response.status === 401) {
        return response;
      }
      if (response.status === 404) {
        return response;
      }
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // reset-password
  async VarifyOtp(userDetail: any) {
    try {
      const response = await axios.post(
        `${this.server_api}/auth/api/v1/verify-otp`,
        { ...userDetail }
      );

      if (response.status === 400) {
        return response;
      }
      if (response.status === 401) {
        return response;
      }
      if (response.status === 410) {
        return response;
      }
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // reset-password
  async ResetPassword(userDetail: any) {
    try {
      const response = await axios.post(
        `${this.server_api}/auth/api/v1/reset-password`,
        { ...userDetail }
      );

      if (response.status === 422) {
        return response;
      }
      if (response.status === 400) {
        return response;
      }
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
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
