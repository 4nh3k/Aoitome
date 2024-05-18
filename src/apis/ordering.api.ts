import { ORDERING_PREFIX, URL_ORDERS } from "../constants/endpoint";
import { CreateOrderDTO } from "../types/DTOs/Ordering/CreateOrderDTO.type";
import { CardType } from "../types/Models/Ordering/BuyerModel/CardType.type";
import { Order } from "../types/Models/Ordering/OrderModel/Order.type";
import { OrderStatus } from "../types/Models/Ordering/OrderModel/OrderStatus.type";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import http from "../utils/http";

export const orderingApi = {
  getOrderingByPage(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Order>>(
      `${ORDERING_PREFIX}${URL_ORDERS}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createOrdering(body: CreateOrderDTO) {
    return http.post<Order>(`${ORDERING_PREFIX}${URL_ORDERS}`, body);
  },
  getAllStatus() {
    return http.get<OrderStatus[]>(`${ORDERING_PREFIX}${URL_ORDERS}/status`);
  },
  getCardTypes() {
    return http.get<CardType[]>(`${ORDERING_PREFIX}${URL_ORDERS}/cardtypes`);
  },
  getOrderByUser(userId: number, pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Order>>(
      `${ORDERING_PREFIX}${URL_ORDERS}/user/${userId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  getOrderDetail(orderId: number) {
    return http.get<Order>(`${ORDERING_PREFIX}${URL_ORDERS}/${orderId}`);
  },
  cancelOrder(orderId: number) {
    return http.patch<Order>(
      `${ORDERING_PREFIX}${URL_ORDERS}/${orderId}/cancel`
    );
  },
  paidOrder(orderId: number) {
    return http.patch<Order>(`${ORDERING_PREFIX}${URL_ORDERS}/${orderId}/paid`);
  },
  shipOrder(orderId: number) {
    return http.patch<Order>(`${ORDERING_PREFIX}${URL_ORDERS}/${orderId}/ship`);
  },
  updateOrderStatus(orderId: number, status: number) {
    return http.patch<Order>(
      `${ORDERING_PREFIX}${URL_ORDERS}/${orderId}/status/${status}`
    );
  },
};
