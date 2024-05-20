export interface ResetPasswordDTO{
  email: string;
  resetToken: string;
  newPassword: string;
}