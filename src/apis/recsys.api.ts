import { RECSYS_PREFIX, URL_PREDICT } from "../constants/endpoint";
import http from "../utils/http";

export const recsysApi = {
  getRecommendations(bookId: string) {
    return http.get<number[]>(`${RECSYS_PREFIX}${URL_PREDICT}/${bookId}`);
  },
};
