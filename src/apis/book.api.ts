import { CATALOG_PREFIX, URL_BOOKS } from "../constants/endpoint";
import Book from "../types/Models/BookCatalog/Book.type";
import { BookDetailDTO } from "../types/DTOs/BookCatalog/BookDetailDTO.type";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import http from "../utils/http";

export const bookApi = {
  getBook(id: string) {
    return http.get<BookDetailDTO>(`${CATALOG_PREFIX}${URL_BOOKS}/${id}`);
  },
  getBookByPage(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<BookGeneralInfoDTO>>(
      `${CATALOG_PREFIX}${URL_BOOKS}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  getSearchBookByPage(searchWord: string, pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<BookGeneralInfoDTO>>(
      `${CATALOG_PREFIX}${URL_BOOKS}/search?searchWord=${searchWord}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createBook(body: CreateBookDTO) {
    return http.post<Book>(`${CATALOG_PREFIX}${URL_BOOKS}`, body);
  },
  updateBook(body: BookDetailDTO) {
    return http.patch<Book>(`${CATALOG_PREFIX}${URL_BOOKS}`, body);
  },
  deleteBook(id: number) {
    return http.delete<Book>(`${CATALOG_PREFIX}${URL_BOOKS}/${id}`);
  },
};
