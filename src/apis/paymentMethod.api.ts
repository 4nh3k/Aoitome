import { PaymentMethodDTO } from "@/types/DTOs/Ordering/PaymentMethodDTO.type";
import { ORDERING_PREFIX, URL_PAYMENT_METHOD } from "@/constants/endpoint";
import { PaginatedResponse } from "@/types/PaginatedResponse.type";
import http from "@/utils/http";

export const paymentMethodApi = {
  getPaymentMethodByBuyer(buyerId: string, pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<PaymentMethodDTO>>(
      `${ORDERING_PREFIX}${URL_PAYMENT_METHOD}/${buyerId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createPaymentMethod(buyerId: string, paymentMethod: PaymentMethodDTO) {
    return http.post<string>(`${ORDERING_PREFIX}${URL_PAYMENT_METHOD}/${buyerId}`, paymentMethod);
  },
  updatePaymentMethod(buyerId: string, paymentMethod: PaymentMethodDTO) {
    return http.patch<string>(`${ORDERING_PREFIX}${URL_PAYMENT_METHOD}/${buyerId}`, paymentMethod);
  },
  deletePaymentMethod(id: number) {
    return http.delete<string>(`${ORDERING_PREFIX}${URL_PAYMENT_METHOD}/${id}`);
  },
};
