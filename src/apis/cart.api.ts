import { CART_PREFIX, URL_CART } from "../constants/endpoint";
import { Cart } from "../types/Models/Cart/Cart.type";
import http from "../utils/http";

export const cartApi = {
  getCart(userId: string) {
    return http.get<Cart>(`${CART_PREFIX}${URL_CART}/${userId}`);
  },
  addToCart(bookId: string) {
    return http.post<Cart>(`${CART_PREFIX}${URL_CART}`, { bookId });
  },
  updateQuantity(bookId: string, quantity: number) {
    return http.put<Cart>(`${CART_PREFIX}${URL_CART}/${bookId}`, { quantity });
  },
  deleteFromCart(bookId: string) {
    return http.delete<Cart>(`${CART_PREFIX}${URL_CART}/${bookId}`);
  },
  clearCart() {
    return http.delete<Cart>(`${CART_PREFIX}${URL_CART}`);
  },
};
