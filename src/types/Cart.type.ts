export interface Item {
  id: number;
  bookId: number;
  title: string;
  unitPrice: number;
  oldUnitPrice: number;
  totalUnitPrice: number;
  quantity: number;
  imageUrl: string;
}

export interface Cart {
  buyerId: string;
  items: Item[];
}
