import { OrderItem } from "../../Models/Ordering/OrderModel/OrderItem.type";
import { AddressDTO } from "./AddressDTO.type";
import { PaymentMethodDTO } from "./PaymentMethodDTO.type";

export interface CreateOrderDTO {
  userId: string;
  userName: string;
  description: string;
  address: AddressDTO;
  paymentMethod: PaymentMethodDTO;
  orderItems: OrderItem[];
}
