export interface OrderDetailDTO{
  id: number;
  addressId: number;
  buyerId?: string;
  orderStatusId?: number;
  description?: string;
  paymentMethodId?: number;
  orderDate?: Date;
  totalAmount?: number;
  shippingId?: number;
  street: string;
  ward: string;
}