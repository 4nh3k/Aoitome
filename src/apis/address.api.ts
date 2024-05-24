import { AddressDTO } from "@/types/DTOs/Ordering/AddressDTO.type";
import { ORDERING_PREFIX, URL_ADDRESS } from "@/constants/endpoint";
import { PaginatedResponse } from "@/types/PaginatedResponse.type";
import http from "@/utils/http";

export const addressApi = {
  getAddressByBuyer(buyerId: string, pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<AddressDTO>>(
      `${ORDERING_PREFIX}${URL_ADDRESS}/${buyerId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createAddress(buyerId: string, address: AddressDTO) {
    return http.post<string>(`${ORDERING_PREFIX}${URL_ADDRESS}/${buyerId}`, address);
  },
  updateAddress(buyerId: string, address: AddressDTO) {
    return http.patch<string>(`${ORDERING_PREFIX}${URL_ADDRESS}/${buyerId}`, address);
  },
  deleteAddress(id: number) {
    return http.delete<string>(`${ORDERING_PREFIX}${URL_ADDRESS}/${id}`);
  },
};
