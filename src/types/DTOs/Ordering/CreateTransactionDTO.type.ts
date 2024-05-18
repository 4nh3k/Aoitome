export interface CreateTransactionDTO{
  buyerId: string;
  totalAmount: number;
  paymentMethodId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}