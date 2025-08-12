import React from "react";
import type { Message } from "../../CustomHooks/UseCustomMsj";

interface Props {
  messages: Message[];
  currentUser: User | null;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}

export interface User {
  username: string;
  token: string;
  password: string;
  id: string;
}

export const Chat = ({
  messages,
  currentUser,
  inputValue,
  setInputValue,
  sendMessage,
}: Props) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Chat Basic</h1>
        <span className="text-blue-100">
          Users online: {JSON.stringify(currentUser)}
        </span>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(({ msj, username }, index) => (
          <div
            key={index}
            className={`flex ${
              username === currentUser?.username ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                username === currentUser?.username
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white border border-gray-200 rounded-bl-none"
              }`}
            >
              <span className="font-semibold">{username}: </span>
              <span>{msj}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Write your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
