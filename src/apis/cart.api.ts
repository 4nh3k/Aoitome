import { CART_PREFIX, URL_CART } from "../constants/endpoint";
import { Cart, Item } from "../types/Models/Cart/Cart.type";
import http from "../utils/http";

export const cartApi = {
  getCart(userId: string) {
    return http.get<Cart>(`${CART_PREFIX}${URL_CART}/${userId}`);
  },
  updateCart(userId: string, item: Item[]) {
    return http.post<Cart>(`${CART_PREFIX}${URL_CART}/${userId}`, item);
  },
  deleteCart(userId: string) {
    return http.delete<Cart>(`${CART_PREFIX}${URL_CART}/${userId}`);
  },
};

const mockItems: Item[] = [
  {
    id: 1,
    bookId: 101,
    title: "Book Title 1",
    unitPrice: 19.99,
    oldUnitPrice: 24.99,
    totalUnitPrice: 19.99 * 2, // Assuming quantity 2
    quantity: 2,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi2vEo9u7o6yMttUelVhB0cs0FgmARiiJ7Vg&s",
  },
  {
    id: 2,
    bookId: 102,
    title: "Book Title 2",
    unitPrice: 29.99,
    oldUnitPrice: 34.99,
    totalUnitPrice: 29.99 * 1, // Assuming quantity 1
    quantity: 1,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgAaVt6EP27NSTp5McrQOHb5QgWumjOdTvrw&s",
  },
];

const mockCart: Cart = {
  buyerId: "user123", // Replace with actual user ID for testing
  items: mockItems,
};

