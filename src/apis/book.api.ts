import { URL_BOOKS, URL_BOOKS_ITEM } from "../constants/endpoint";
import Book from "../types/Book.type";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import http from "../utils/http";

export const bookApi = {
  getBook(id: string) {
    return http.get<Book>(`${URL_BOOKS}/${id}`);
  },
  getBookByPage(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Book>>(
      `${URL_BOOKS_ITEM}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
};
