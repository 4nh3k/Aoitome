import { UserDTO } from "./UserDto.type";

export interface LoginReponseDTO{
  user: UserDTO;
  token: string;
}