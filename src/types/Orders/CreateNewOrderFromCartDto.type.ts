import { CreateDeliveryDTO } from "../Deliveries/CreateDeliveryDto.type";

export interface CreateNewOrderFromCartDTO{
  deliveryDto: CreateDeliveryDTO;
  deliveryId: string, 
  cartItemIds: string[],
  paymentMethod: number;
}