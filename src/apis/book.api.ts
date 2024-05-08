import { CATALOG_PREFIX, URL_BOOKS, URL_GENRES } from "../constants/endpoint";
import Book from "../types/Book.type";
import Genre from "../types/Genre.type";
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
  getGenresByPage(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Genre>>(
      `${CATALOG_PREFIX}${URL_GENRES}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
};
