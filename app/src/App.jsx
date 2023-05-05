import { useState } from "react";

import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function App() {
  const [messages, setMessages] = useState([
    { message: "Hello I am ChatGPT", sender: "ChatGPT" },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      sender: "User",
      direction: "outgoing",
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);
  };

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((message, index) => (
                <Message key={index} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
