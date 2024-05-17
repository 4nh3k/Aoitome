export interface User{
  cardFullName?: string;
  cardNumber?: string;
  cardCVC?: string;
  expirationDate?: Date;
  firstName?: string;
  lastName?: string;
  address?: string;
  profileImageLink?: string;
  fullName: string;
  country: string;
  city: string;
  timezone: string;
  role?: string;
}