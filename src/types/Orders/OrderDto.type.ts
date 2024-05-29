import { ShippingDTO } from "./ShippingDTO.type";

export interface OrderDTO{
  id: string;
  userId: string;
  shippingId: string;
  orderStatus: string;
  createDate: Date;
  paymentMethod: string;
  totalPrice: number;
  shipping: ShippingDTO
}