import { useState, useEffect, useRef } from "react";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Chat } from "./components/Chat/Chat";
import { UseCustomMsj } from "./CustomHooks/UseCustomMsj";

export interface User {
  username: string;
  token: string;
  password: string;
}

const users: User[] = [
  {
    username: "alice",
    token: "alice-token",
    password: "123456",
  },
  {
    username: "bob",
    token: "bob-token",
    password: "123456",
  },
  {
    username: "charlie",
    token: "charlie-token",
    password: "123456",
  },
];

export default function App() {
  const socketRef = useRef<WebSocket | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { inputValue, setInputValue, setMessages, messages } = UseCustomMsj();
  // Conetion to the WebSocket server
  useEffect(() => {
    // socketRef.current = new WebSocket("ws://localhost:3001");
    if (!currentUser) return;
    socketRef.current = new WebSocket(
      `ws://localhost:3001?token=${currentUser.token}`
    );
    socketRef.current.onopen = () => {
      console.log("Conextion WebSocket it established");
    };

    socketRef.current.onmessage = (event) => {
      console.log("event", event);
      const StringToJson = JSON.parse(event.data);
      console.log("StringToJson", StringToJson);

      setMessages((prev) => [
        ...prev,
        { msj: StringToJson.msj, username: StringToJson.username },
      ]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [currentUser, setMessages]);

  const sendMessage = () => {
    if (socketRef.current && inputValue.trim()) {
      socketRef.current.send(inputValue);
      setInputValue("");
    }
  };

  if (!currentUser) {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm onLogin={setCurrentUser} users={users} />
      </div>
    );
  }

  return (
    <Chat
      messages={messages}
      inputValue={inputValue}
      setInputValue={setInputValue}
      sendMessage={sendMessage}
      currentUser={currentUser}
    />
  );
}
