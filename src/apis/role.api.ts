
import { ROLE_PREFIX } from "../constants/endpoint";
import { CreateRoleDto } from "../types/Roles/CreateRoleDto.type";
import { UpdateRoleDTO } from "../types/Roles/UpdateRoleDto.type";
import http from "../utils/http";

export const roleApi = {
  getAllUserWithRoles() {
    return http.get<Response>(`${ROLE_PREFIX}`);
  },
  createRole(body: CreateRoleDto){
    return http.post<Response>(`${ROLE_PREFIX}`, body);
  },
  updateRole(body: UpdateRoleDTO){
    return http.patch<Response>(`${ROLE_PREFIX}`, body);
  },
  getRoleById(id: string){
    return http.get<Response>(`${ROLE_PREFIX}${id}`);
  },
  deleteRoleById(id: string){
    return http.delete<Response>(`${ROLE_PREFIX}${id}`);
  }
};

export default roleApi;
