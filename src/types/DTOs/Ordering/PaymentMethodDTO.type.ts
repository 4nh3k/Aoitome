export interface PaymentMethodDTO {
  alias: string;
  cardNumber?: string;
  securityNumber?: string;
  cardHoldername?: string;
  expiration?: string;
  cardTypeId: number;
}
