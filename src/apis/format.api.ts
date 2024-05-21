import { CATALOG_PREFIX, URL_FORMATS } from "../constants/endpoint";
import Format from "../types/Models/BookCatalog/Format.type";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import http from "../utils/http";

export const formatsApi = {
  getFormatByPages(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Format>>(
      `${CATALOG_PREFIX}${URL_FORMATS}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createFormat(name: string) {
    const body = { name };
    return http.post<Format>(`${CATALOG_PREFIX}${URL_FORMATS}`, body);
  },
  updateFormat(body: Format) {
    return http.patch<Format>(`${CATALOG_PREFIX}${URL_FORMATS}`, body);
  },
  deleteFormat(id: number) {
    return http.patch<Format>(`${CATALOG_PREFIX}${URL_FORMATS}/${id}`);
  },
};
