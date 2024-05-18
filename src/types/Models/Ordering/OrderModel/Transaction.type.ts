export interface Transaction{
  id: number;
  buyerId: string;
  totalAmount: number;
  paymentMethodId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}