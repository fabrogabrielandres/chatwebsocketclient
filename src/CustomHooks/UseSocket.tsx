import { useEffect, useRef, useState } from "react";
import type { User } from "../components/Chat/Chat";
import type { Message } from "./UseCustomMsj";

interface Props {
  currentUser: User | null;
}

export default function UseSocket({ currentUser }: Props) {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // socketRef.current = new WebSocket("ws://localhost:3001");
    if (!currentUser) return;
    socketRef.current = new WebSocket(
      `ws://localhost:3001?tokenUser=${currentUser.token}`
    );
    socketRef.current.onopen = () => {
      console.log("Conextion WebSocket it established");
    };

    socketRef.current.onmessage = (event) => {
      const StringToJson = JSON.parse(event.data);
      setMessages((prev) => [
        ...prev,
        { msj: StringToJson.msj, username: StringToJson.username },
      ]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [currentUser, setMessages]);
  return { socketRef, messages };
}
