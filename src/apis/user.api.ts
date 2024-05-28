import { USER_PREFIX } from "../constants/endpoint";
import { AssignRoleDTO } from "../types/Auths/AssignRoleDto.type";
import { UpdateUserDTO } from "../types/Users/UpdateUserDto.type";
import http from "../utils/http";

export const userApi = {
  getUserByRole(roleId: string) {
    return http.get<Response>(`${USER_PREFIX}?roleId=${roleId}`);
  },
  getUserById(userId: string){
    return http.get<Response>(`${USER_PREFIX}/${userId}`);
  },
  updateRole(body: UpdateUserDTO){
    return http.patch<Response>(`${USER_PREFIX}`, body);
  },

  assignRoleToUser(userId: string, body: AssignRoleDTO){
    return http.post<Response>(`${USER_PREFIX}${userId}/assignRole`, body);
  }
};

export default userApi;
