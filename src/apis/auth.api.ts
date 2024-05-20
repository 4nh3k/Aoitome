import {
  IDENTITY_PREFIX,
  URL_FILE_UPLOAD,
  URL_LOGIN,
  URL_LOGOUT,
  URL_PROFILE,
  URL_REGISTER,
  URL_RESETPASS,
  URL_TOKEN,
  URL_UPDATEPASS,
  URL_UPDATE_PROFILE,
} from "../constants/endpoint";
import { ResetPasswordDTO } from "../types/DTOs/Identity/ResetPasswordDTO.type";
import { UpdatePasswordDTO } from "../types/DTOs/Identity/UpdatePasswordDTO.type";
import { AuthResponse } from "../types/Models/Identity/AuthResponse.type";
import { User } from "../types/Models/Identity/User.type";
import { UploadImage } from "../types/Models/UploadImage.type";
import http from "../utils/http";

export const authApi = {
  register(body: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  }) {
    return http.post(`${IDENTITY_PREFIX}${URL_REGISTER}`, {
      ...body,
      passwordConfirm: body.confirmPassword,
    });
  },
  login(body: { username: string; password: string }) {
    return http.post<AuthResponse>(`${IDENTITY_PREFIX}${URL_LOGIN}`, body);
  },
  logout() {
    return http.post<{
      status: string;
    }>(`${IDENTITY_PREFIX}${URL_LOGOUT}`);
  },
  uploadImage(body: {
    image: File
  }) {
    const formData = new FormData();
    console.log(body.image);
    formData.append('image', body.image);

    return http.post<UploadImage>(`${IDENTITY_PREFIX}${URL_FILE_UPLOAD}`,
      formData,
      {
        headers: 
        {
          'Content-Type': 'multipart/form-data'
        }
      });
  },
  getResetPassToken(body: {email: string}){
      return http.post<string>(`${IDENTITY_PREFIX}${URL_TOKEN}`, body);
  },
  updatePassword(userId: string, body: UpdatePasswordDTO){
      return http.post<string>(`${IDENTITY_PREFIX}/users/${userId}${URL_UPDATEPASS}`, body);
  },
  resetPassword(body: ResetPasswordDTO){
    return http.post<string>(`${IDENTITY_PREFIX}${URL_RESETPASS}`, body);
  },
  getUserProfile(userId: string){
    console.log(`${IDENTITY_PREFIX}${URL_PROFILE}/${userId}`)
    return http.get<User>(`${IDENTITY_PREFIX}${URL_PROFILE}/${userId}`);
  },
  updateUserProfile(userId: string, body: UserUpdateDTO){
    return http.patch<string>(`${IDENTITY_PREFIX}${URL_UPDATE_PROFILE}/${userId}`, body, {
      headers: 
        {
          'Content-Type': 'application/json'
        }
    }
    );
  }
};

export default authApi;
