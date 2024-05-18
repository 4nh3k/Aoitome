import { CATALOG_PREFIX, URL_PUBLISHERS } from "../constants/endpoint";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import { Publisher } from "../types/Publishers.type";
import http from "../utils/http";

export const publisherApi = {
  getPublisherByPages(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Publisher>>(
      `${CATALOG_PREFIX}${URL_PUBLISHERS}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createPublisher(body: Publisher) {
    return http.post<Publisher>(`${CATALOG_PREFIX}${URL_PUBLISHERS}`, body);
  },
  updatePublisher(body: Publisher) {
    return http.patch<Publisher>(`${CATALOG_PREFIX}${URL_PUBLISHERS}`, body);
  },
  deletePublisher(id: number) {
    return http.patch<Publisher>(`${CATALOG_PREFIX}${URL_PUBLISHERS}/${id}`);
  },
};
