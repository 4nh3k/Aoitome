export interface User {
  cardFullName: string | null;
  cardNumber: string | null;
  cardCVC: string | null;
  expirationDate: string | null;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  profileImageLink: string | null;
  fullName: string | null;
  country: string | null;
  city: string | null;
  timezone: string | null;
  role: string | null;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}