import { useState, useEffect, useRef } from "react";

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  // Conetion to the WebSocket server
  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3001");

    socketRef.current.onopen = () => {
      console.log("Conextion WebSocket it established");
    };

    socketRef.current.onmessage = (event) => {
      console.log("event", event);

      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && inputValue.trim()) {
      socketRef.current.send(inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <h1>Chat Basic</h1>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Write your msj..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
