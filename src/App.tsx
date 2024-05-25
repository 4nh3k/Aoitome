import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ChatBot, { Flow, Params } from "react-chatbotify";
import { ToastContainer } from "react-toastify";
import { chatbotApi } from "./apis/chatbot.api";
import { AppProvider } from "./contexts/app.context";
import useRouteElement from "./useRouteElement";
import ScrollToTop from "./utils/scrollToTop";

export default function App() {
  const routeElement = useRouteElement();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  const flow: Flow = {
    start: {
      message: "Hello, what can I help you with today?",
      path: "loop",
    },
    loop: {
      message: async (params: Params) => {
        const res = await chatbotApi.getChatResponse(params.userInput);
        return res.data.response;
      },
      path: () => {
        return "loop";
      },
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ScrollToTop />
        <div className="overflow-x-hidden overflow-y-hidden">
          {routeElement}
          <ToastContainer position="top-right" />
          <ChatBot flow={flow} options={options} />
        </div>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
