import {
  AUTH_PREFIX,
  URL_FORGOTPASS,
  URL_LOGIN,
  URL_OTPS,
  URL_REGISTER,
  URL_RESETPASS,
} from "../constants/endpoint";
import { LoginDTO } from "../types/Auths/LoginDto.type";
import { LoginReponseDTO } from "../types/Auths/LoginResponseDto.type";
import { RegisterDTO } from "../types/Auths/RegisterDto.type";
import { RegisterResponseDTO } from "../types/Auths/RegisterResponseDto.type";
import { ResetPasswordDTO } from "../types/Auths/ResetPasswordDto.type";
import { SendOTPDTO } from "../types/Auths/SendOTPDto.type";
import http from "../utils/http";

export const authApi = {
  register(body: RegisterDTO) {
    return http.post<RegisterResponseDTO>(`${AUTH_PREFIX}${URL_REGISTER}`, {
      ...body,
    });
  },
  login(body: LoginDTO) {
    return http.post<LoginReponseDTO>(`${AUTH_PREFIX}${URL_LOGIN}`, body);
  },
  getOTPs(body: SendOTPDTO) {
    return http.post<Response>(`${AUTH_PREFIX}${URL_OTPS}`, body);
  },
  forgotPassword(body: SendOTPDTO){
    return http.post<Response>(`${AUTH_PREFIX}${URL_FORGOTPASS}`, body)
  },
  resetPassword(body: ResetPasswordDTO){
    return http.post<Response>(`${AUTH_PREFIX}${URL_RESETPASS}`, body)
  }
};

export default authApi;
