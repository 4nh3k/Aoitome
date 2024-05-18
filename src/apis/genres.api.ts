import { CATALOG_PREFIX, URL_GENRES } from "../constants/endpoint";
import Genre from "../types/Models/BookCatalog/Genre.type";
import { PaginatedResponse } from "../types/PaginatedResponse.type";
import http from "../utils/http";

export const genresApi = {
  getGenresByPage(pageIndex: number, pageSize: number) {
    return http.get<PaginatedResponse<Genre>>(
      `${CATALOG_PREFIX}${URL_GENRES}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  },
  createGenre(body: Genre) {
    return http.post<Genre>(`${CATALOG_PREFIX}${URL_GENRES}`, body);
  },
  updateGenre(body: Genre) {
    return http.patch<Genre>(`${CATALOG_PREFIX}${URL_GENRES}`, body);
  },
  deleteGenre(id: string) {
    return http.delete<Genre>(`${CATALOG_PREFIX}${URL_GENRES}/${id}`);
  },
};
