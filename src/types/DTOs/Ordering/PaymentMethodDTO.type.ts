export interface PaymentMethodDTO {
  id: number;
  alias: string;
  cardNumber?: string;
  securityNumber?: string;
  cardHoldername?: string;
  expiration?: string;
  cardTypeId: number;
  cardTypeName: string;
  buyerId: string;
}
