import { CreateDeliveryDTO } from "../Deliveries/CreateDeliveryDto.type";
import { CreateOrderItemDTO } from "../OrderItems/CreateOrderItemDto.type";

export interface CreateNewOrderDTO{
  deliveryDto: CreateDeliveryDTO;
  deliveryId: string, 
  orderItems: CreateOrderItemDTO[],
  paymentMethod: number;
}