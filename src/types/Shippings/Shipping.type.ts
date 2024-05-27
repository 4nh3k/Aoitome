export interface Shipping{
  id: string;
  expectationShippingDate: Date;
  actualShippingDate: Date;
  deliveryId: string;
  shippingStatus: number;
  orderId: string;
}