export interface OrderItem {
  id?: number;
  bookId: number;
  title?: string;
  unitPrice?: number;
  oldUnitPrice?: number;
  totalUnitPrice?: number;
  quantity?: number;
  imageUrl: string;
  orderId?: number;
}
