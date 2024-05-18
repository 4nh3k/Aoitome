export interface PaymentMethodDTO{
  alias: string;
  cardNumber?: string;
  securityNumber?: string;
  cardHoldername?: string;
  expiration?: Date;
  cardTypeId: number;
}