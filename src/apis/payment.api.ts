import { ORDERING_PREFIX, URL_PAYMENT } from "../constants/endpoint";
import http from "../utils/http";

export const paymentApi = {
  createCheckoutSession() {
    return http.post<string>(`${ORDERING_PREFIX}${URL_PAYMENT}`);
  },
};
