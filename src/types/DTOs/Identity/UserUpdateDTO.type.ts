interface UserUpdateDTO {
  id: string;
  email?: string;
  phoneNumber?: string;
  cardFullName?: string;
  cardNumber?: string;
  cardCVC?: string;
  expirationDate?: Date;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  address?: string;
  profileImageLink?: string;
  country?: string;
  city?: string;
  timezone?: string;
}