import { LoginReponseDTO } from "./LoginResponseDto.type";

export interface AuthResponse{
  isSuccess: boolean;
  message: string;
  result: LoginReponseDTO
}