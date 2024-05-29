import { DeliveryDTO } from "./DeliveryDto.type";

export interface ShippingDTO{
  id: string;
  expectationShippingDate: Date;
  actualShippingDate: Date;
  deliveryId: string;
  shippingStatus: string;
  delivery: DeliveryDTO;
}