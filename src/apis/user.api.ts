import { UpdatePasswordDTO } from "@/types/Users/UpdatePasswordDTO.type";
import { URL_AVATAR, URL_PASSWORD, USER_PREFIX } from "../constants/endpoint";
import { AssignRoleDTO } from "../types/Auths/AssignRoleDto.type";
import { UpdateUserDTO } from "../types/Users/UpdateUserDto.type";
import http from "../utils/http";
import { ApiResponse } from "@/types/ApiResponse.type";
import { GetUserResponseDTO } from "@/types/Users/GetUserResponseDto.type";
import { UpdateUserResponseDTOP } from "@/types/Users/UpdateUserResponseDto.type";
import { PaginatedData } from "@/types/PaginatedData.type";

export const userApi = {
  getUserByRole(roleId: string) {
    return http.get<ApiResponse<PaginatedData<GetUserResponseDTO>>>(`${USER_PREFIX}?roleId=${roleId}`);
  },
  searchUser(pageIndex: number, pageSize: number, keyword: string){
    return http.get<ApiResponse<PaginatedData<GetUserResponseDTO>>>(`${USER_PREFIX}?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`);
  },
  uploadImg(file: File){
    const formData = new FormData();
    console.log(file);
    formData.append("file", file);
    console.log(`${USER_PREFIX}/upload`)
    return http.post<ApiResponse<string>>(
      `${USER_PREFIX}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/\form-data",
        },
      }
    );
  },

  getUserById(userId: string){
    return http.get<ApiResponse<GetUserResponseDTO>>(`${USER_PREFIX}/${userId}`);
  },
  updateUser(userId: string, body: UpdateUserDTO){
    return http.patch<ApiResponse<UpdateUserResponseDTOP>>(`${USER_PREFIX}/${userId}`, body);
  },
  assignRoleToUser(userId: string, body: AssignRoleDTO){
    return http.post<Response>(`${USER_PREFIX}${userId}/assignRole`, body);
  },
  updatePassword(userId: string, body: UpdatePasswordDTO){
    return http.patch<Response>(`${USER_PREFIX}/${userId}${URL_PASSWORD}`, body);
  },
  upsertPhoto(userId: string, file: File){
    const formData = new FormData();
    console.log(file);
    formData.append("file", file);
    console.log(`${USER_PREFIX}/${userId}${URL_AVATAR}`)
    return http.post<Response>(
      `${USER_PREFIX}/${userId}${URL_AVATAR}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/\form-data",
        },
      }
    );
  }
};

export default userApi;
