import { URL_BOOKS } from "../constants/endpoint";
import Book from "../types/Book.type";
import http from "../utils/http";

export const bookApi = {
  getBook(id: string) {
    return http.get<Book>(`${URL_BOOKS}/${id}`);
  },
};
