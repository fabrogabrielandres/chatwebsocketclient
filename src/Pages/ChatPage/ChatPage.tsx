import { useEffect, useRef, useState } from "react";
import { Chat, type User } from "../../components/Chat/Chat";
import { UseCustomMsj } from "../../CustomHooks/UseCustomMsj";
import { useAuthStore } from "../../stores/auth/auth.store";

export const ChatPage = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentToken, setCurrentToken] = useState<string | undefined>(
    undefined
  );
  const { inputValue, setInputValue, setMessages, messages } = UseCustomMsj();

  const getUser = useAuthStore((state) => state.getUser);
  const getToken = useAuthStore((state) => state.getToken);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setCurrentUser(user);
    }
  }, [getUser]);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setCurrentToken(token);
    }
  }, [getToken]);

  // Conetion to the WebSocket server
  useEffect(() => {
    // socketRef.current = new WebSocket("ws://localhost:3001");
    if (!currentUser) return;
    socketRef.current = new WebSocket(
      `ws://localhost:3001?token=${currentToken}`
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

  return (
    <div>
      <Chat
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        sendMessage={sendMessage}
        currentUser={currentUser}
      />
    </div>
  );
};
