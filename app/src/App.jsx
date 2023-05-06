// note: using this as reference https://www.youtube.com/watch?v=Lag9Pj_33hM

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

const key = "";

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Hello I am ChatGPT", sender: "ChatGPT" },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      sender: "user",
      direction: "outgoing",
    };

    setMessages((currentMessages) => [...currentMessages, newMessage]);

    setTyping(true);

    await processMessageToChatGPT([...messages, newMessage]);
  };

  async function processMessageToChatGPT(chatMessages) {
    console.log(
      "🚀 ~ file: App.jsx:37 ~ processMessageToChatGPT ~ chatMessages:",
      chatMessages
    );

    let apiMessages = chatMessages.map((message) => {
      let role = "";
      if (message.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: message.message };
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concepts like I am 10 years old",
    };

    const apiRequestBody = {
      // prettier-ignore
      "model": "gpt-3.5-turbo",
      // prettier-ignore
      "messages": [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        "Authorization": `Bearer ${key}`,
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);

        setTyping(false);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="ChatGPT is typing" /> : null
              }
            >
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
