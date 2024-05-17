export interface PaymentMethod{
  id: number;
  alias: string;
  cardNumber?: string;
  securityNumber?: string;
  cardHoldername?: string;
  expiration?: Date;
  cardTypeId?: number;
  buyerId?: number;
}