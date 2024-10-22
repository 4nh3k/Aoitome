export interface Item {
  id?: number;
  bookId: number;
  title: string;
  unitPrice: number;
  oldUnitPrice: number;
  totalUnitPrice: number;
  quantity: number;
  imageUrl: string;
  selected: boolean // Default value // Frontend-only property
}

export interface Cart {
  buyerId: string;
  items: Item[];
}
