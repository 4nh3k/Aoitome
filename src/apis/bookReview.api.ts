import { CATALOG_PREFIX, URL_BOOK_REVIEWS } from "../constants/endpoint";
import { BookReviews } from "../types/BookReviews.type";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import http from "../utils/http";

export const bookReviewApi = {
  getBookReviewByBook(bookId: number, pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<BookReviews>>(
      `${CATALOG_PREFIX}${URL_BOOK_REVIEWS}/book/${bookId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  getBookReviewByUser(userId: string, pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<BookReviews>>(
      `${CATALOG_PREFIX}${URL_BOOK_REVIEWS}/user/${userId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  deleteBookReview(userId: string, bookId: number) {
    return http.delete<BookReviews>(
      `${CATALOG_PREFIX}${URL_BOOK_REVIEWS}?userId=${userId}&bookId=${bookId}`
    );
  },
  createBookReview(review: BookReviewDTO) {
    return http.post<string>(`${CATALOG_PREFIX}${URL_BOOK_REVIEWS}`, review);
  },
  updateBookReview(review: BookReviewDTO) {
    return http.patch<BookReviews>(
      `${CATALOG_PREFIX}${URL_BOOK_REVIEWS}`,
      review
    );
  },
};
