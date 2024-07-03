import { useState } from "react";
import ChatBot, { Flow, Params } from "react-chatbotify";
import { ToastContainer } from "react-toastify";
import { chatbotApi } from "./apis/chatbot.api";
import { AppProvider } from "./contexts/app.context";
import useRouteElement from "./useRouteElement";
import ScrollToTop from "./utils/scrollToTop";

export default function App() {
  const routeElement = useRouteElement();

  const [userInput, setUserInput] = useState<string[]>([]);
  const [response, setResponse] = useState<string>("");

  const flow: Flow = {
    start: {
      message: "Hello, what can I help you with today?",
      path: "wait_me",
    },
    wait_me: {
      message: async (params: Params) => {
        console.log(params.userInput);
        const res = await chatbotApi.getChatResponse(params.userInput);
        console.log(res);
        setUserInput(res.data.ids.map((id) => id.toString()));
        setResponse(res.data.response);
        return "Wait for me, I'm getting the information for you!";
      },
      transition: { duration: 1000 },
      path: "loop",
    },
    loop: {
      message: response,
      options: userInput,
      path: () => {
        if (userInput.length === 0) return "wait_me";
        return "process_options";
      },
    },
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params) => {
        let link = `localhost:3000/product/${params.userInput}`;
        setUserInput([]);
        console.log(link);
        await params.injectMessage("Sit tight! I'll send you right there!");
        console.log(link, "link");

        setTimeout(() => {
          window.open(link);
        }, 1000);
        return "more_help";
      },
    },
    more_help: {
      message: "Is there anything else I can help you with?",
      path: "wait_me",
    },
  };

  return (
    <AppProvider>
      <ScrollToTop />
      <div className="overflow-x-hidden overflow-y-hidden">
        {routeElement}
        <ToastContainer position="top-right" />
        <ChatBot flow={flow} />
      </div>
    </AppProvider>
  );
}
