import ChatBot from "react-chatbotify";

const MyChatBot = () => {
  return (
    <ChatBot
      options={{
        theme: { embedded: true },
        chatHistory: { storageKey: "example_llm_conversation" },
      }}
      flow={flow}
    />
  );
};

export default MyChatBot;
