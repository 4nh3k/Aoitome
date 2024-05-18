import { CATALOG_PREFIX, URL_FORMATS } from "../constants/endpoint";
import { Fromat } from "../types/Format.type";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import http from "../utils/http";

export const formatsApi = {
  getFormatByPages(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Fromat>>(
      `${CATALOG_PREFIX}${URL_FORMATS}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createFormat(name: string) {
    const body = { name };
    return http.post<Fromat>(`${CATALOG_PREFIX}${URL_FORMATS}`, body);
  },
  updateFormat(body: Fromat) {
    return http.patch<Fromat>(`${CATALOG_PREFIX}${URL_FORMATS}`, body);
  },
  deleteFormat(id: number) {
    return http.patch<Fromat>(`${CATALOG_PREFIX}${URL_FORMATS}/${id}`);
  },
};
