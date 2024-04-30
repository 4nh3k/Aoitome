import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from "../constants/endpoint";
import { AuthResponse } from "../types/AuthResponse.type";
import http from "../utils/http";

const authApi = {
  register(body: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  }) {
    return http.post(URL_REGISTER, {
      ...body,
      passwordConfirm: body.confirmPassword,
    });
  },
  login(body: { username: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },
  logout() {
    return http.post<{
      status: string;
    }>(URL_LOGOUT);
  },
};

export default authApi;
