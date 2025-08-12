import { useState } from "react";

export interface Message {
  msj: string;
  username: string;
}

export const UseCustomMsj = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  return {
    setMessages,
    setInputValue,
    inputValue,
    messages,
  };
};
