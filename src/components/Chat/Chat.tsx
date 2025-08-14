import { useState } from "react";
import { useWebSocketStore } from "../../stores/websocket/websocket.store";
import type { User } from "../../stores/auth/auth.store";


interface ChatProps {
  currentRoom: string;
  currentUser?: User;
}

export const Chat = ({ currentRoom, currentUser }: ChatProps) => {
  const { messages, sendMessage } = useWebSocketStore();
  const [newMessage, setNewMessage] = useState("");

  // Filtrar mensajes para la sala actual
  const currentMessages = messages.filter((msg) => msg.room === currentRoom);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Chat App</h1>
        <div className="flex justify-between items-center">
          <span className="text-blue-100">
            Sala actual: <span className="font-medium">{currentRoom}</span>
          </span>
          <span className="text-blue-100">
            Usuario: <span className="font-medium">{currentUser?.username}</span>
          </span>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentMessages.length > 0 ? (
          currentMessages.map(({ msj, username }, index) => (
            <div
              key={index}
              className={`flex ${
                username === currentUser?.username
                  ? "justify-end"
                  : "justify-start"
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
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay mensajes en esta sala
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};