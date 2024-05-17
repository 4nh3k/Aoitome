export interface Order{
  id: number;
  addressId: number;
  buyerId?: string;
  orderStatusId?: number;
  description?: string;
  paymentMethodId?: number;
  orderDate: Date;
  totalAmount: number;
}