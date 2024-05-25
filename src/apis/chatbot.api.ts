import http from "../utils/http";

export const chatbotApi = {
  getChatResponse(query: string) {
    return http.post<{
      response: string;
      ids: string[];
    }>(`/chatbot.api/generate`, {
      query,
    });
  },
};
