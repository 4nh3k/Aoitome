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
