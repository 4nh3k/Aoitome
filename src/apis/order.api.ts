import { ApiResponse } from "@/types/ApiResponse.type";
import { AllDTO } from "@/types/Orders/AllOrdersDTO.type";
import { OrderDTO } from "@/types/Orders/OrderDto.type";
import {
  ADD_INFO_FROM_CART_URL,
  CANCEL_ORDER_URL,
  GET_ALL_ORDER_URL,
  GET_ORDER_BY_USERS_URL,
  ORDER_PREFIX,
} from "../constants/endpoint";
import { CreateNewOrderFromCartDTO } from "../types/Orders/CreateNewOrderFromCartDto.type";
import http from "../utils/http";

export const orderApi = {
  getAllOrders(pageNumber: number, pageSize: number) {
    return http.get<ApiResponse<AllDTO<OrderDTO>>>(
      `${ORDER_PREFIX}${GET_ALL_ORDER_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  },
  getOrderById(id: string) {
    return http.get<Response>(`${ORDER_PREFIX}/${GET_ALL_ORDER_URL}/${id}`);
  },
  addOrderFromCart(body: CreateNewOrderFromCartDTO) {
    return http.post<string>(`${ORDER_PREFIX}${ADD_INFO_FROM_CART_URL}`, body);
  },
  cancelOrder(orderId: string) {
    return http.patch<Response>(
      `${ORDER_PREFIX}/${CANCEL_ORDER_URL}/${orderId}`
    );
  },
  paymentCallback(vnp_OrderInfo: string) {
    return http.get<ApiResponse<OrderDTO[]>>(
      `${ORDER_PREFIX}?vnp_OrderInfo=${vnp_OrderInfo}`
    );
  },
  getOrderByUser(userId: string) {
    return http.get<ApiResponse<OrderDTO[]>>(
      `${ORDER_PREFIX}${GET_ORDER_BY_USERS_URL}/${userId}`
    );
  },
};

export default orderApi;
