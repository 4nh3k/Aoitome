export interface TransactionDetailDTO{
  id: number;
  buyerId: string;
  totalAmount: number;
  paymentMethodId: number;
  status: string;
  createdAt: Date;
  buyerName: string;
}