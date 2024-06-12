import { OrderItem } from "@/types/Models/Ordering/OrderModel/OrderItem.type";
import { ORDERING_PREFIX, URL_PAYMENT } from "../constants/endpoint";
import http from "../utils/http";

export const paymentApi = {
  createCheckoutSession(items : OrderItem []) {
    return http.post<string>(`${ORDERING_PREFIX}${URL_PAYMENT}`, items);
  },
};
