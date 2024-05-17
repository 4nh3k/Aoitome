export interface OrderItemDTO{
  bookId: number;
  title?: string;
  unitPrice?: number;
  oldUnitPrice?: number;
  totalUnitPrice?: number;
  quantity?: number;
  imageUrl?: string;
}