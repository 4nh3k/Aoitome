export interface DeliveryDTO{
  id: string;
  addressId: string;
  userId: string;
  isDepartment: boolean;
  receiverIsMe: boolean;
  information: string;
  address: any;
}