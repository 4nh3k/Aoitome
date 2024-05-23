import {
  ORDERING_PREFIX,
  URL_ORDERS,
  URL_TRANSACTIONS,
} from "../constants/endpoint";
import { CreateOrderDTO } from "../types/DTOs/Ordering/CreateOrderDTO.type";
import { OrderDTO } from "../types/DTOs/Ordering/OrderDTO.type";
import { CardType } from "../types/Models/Ordering/BuyerModel/CardType.type";
import { MonthlyTransactionSummary } from "../types/Models/Ordering/MonthlyTransactionSummary.type";
import { Order } from "../types/Models/Ordering/OrderModel/Order.type";
import { OrderStatus } from "../types/Models/Ordering/OrderModel/OrderStatus.type";
import { Report } from "../types/Models/Ordering/OrderModel/Report.type";
import { Transaction } from "../types/Models/Ordering/OrderModel/Transaction.type";
import { TopProduct } from "../types/Models/Ordering/TopProduct.type";
import { WeeklyTransactionSummary } from "../types/Models/Ordering/WeeklyTransactionSummary.type";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import http from "../utils/http";

export const orderingApi = {
  getOrderingByPage(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Order>>(
      `${ORDERING_PREFIX}${URL_ORDERS}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createOrdering(body: CreateOrderDTO) {
    console.log("body", body);
    return http.post<Order>(`${ORDERING_PREFIX}${URL_ORDERS}`, body);
  },
  getAllStatus() {
    return http.get<OrderStatus[]>(`${ORDERING_PREFIX}${URL_ORDERS}/status`);
  },
  getCardTypes() {
    return http.get<CardType[]>(`${ORDERING_PREFIX}${URL_ORDERS}/cardtypes`);
  },
  getOrderByUser(userId: number, pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<OrderDTO>>(
      `${ORDERING_PREFIX}${URL_ORDERS}/buyer/${userId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
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
  getReportMetrics() {
    return http.get<Report>(`${ORDERING_PREFIX}${URL_ORDERS}/report`);
  },
  getTransactionByWeek() {
    return http.get<WeeklyTransactionSummary[]>(
      `${ORDERING_PREFIX}${URL_TRANSACTIONS}/week`
    );
  },
  getTransactionByMonth() {
    return http.get<MonthlyTransactionSummary[]>(
      `${ORDERING_PREFIX}${URL_TRANSACTIONS}/month`
    );
  },
  getTransactionByPage(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Transaction>>(
      `${ORDERING_PREFIX}${URL_TRANSACTIONS}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  getTopTenProduct(){
    return http.get<TopProduct[]>(`${ORDERING_PREFIX}${URL_ORDERS}/top-10-products`)
  }
};
