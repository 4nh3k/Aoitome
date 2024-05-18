import { CATALOG_PREFIX, URL_BOOKS } from "../constants/endpoint";
import Book from "../types/Book.type";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import http from "../utils/http";

export const bookApi = {
  getBook(id: string) {
    return http.get<Book>(`${CATALOG_PREFIX}${URL_BOOKS}/${id}`);
  },
  getBookByPage(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Book>>(
      `${CATALOG_PREFIX}${URL_BOOKS}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  getSearchBookByPage(searchWord: string, pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Book>>(
      `${CATALOG_PREFIX}${URL_BOOKS}/search?searchWord=${searchWord}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createBook(body: Book) {
    return http.post<Book>(`${CATALOG_PREFIX}${URL_BOOKS}`, body);
  },
  updateBook(body: Book) {
    return http.patch<Book>(`${CATALOG_PREFIX}${URL_BOOKS}`, body);
  },
  deleteBook(id: string) {
    return http.delete<Book>(`${CATALOG_PREFIX}${URL_BOOKS}/${id}`);
  },
};
