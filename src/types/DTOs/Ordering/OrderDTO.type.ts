export interface OrderDTO{
  id: number;
  addressId: number;
  buyerId?: string;
  orderStatusId?: number;
  description?: string;
  paymentMethodId?: number;
  orderDate: Date;
  totalAmount: number;
  shippingId: number;
  buyerName: string;
  orderStatusName: string;
}