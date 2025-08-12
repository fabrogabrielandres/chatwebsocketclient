import { useState, useEffect, useRef } from "react";

interface User {
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

interface Message {
  msj: string;
  username: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const socketRef = useRef<WebSocket | null>(null);
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);
  // Conetion to the WebSocket server
  useEffect(() => {
    // socketRef.current = new WebSocket("ws://localhost:3001");
    if (!selectedUser) return;
    socketRef.current = new WebSocket(
      `ws://localhost:3001?token=${selectedUser.token}`
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
  }, [selectedUser]);

  const sendMessage = () => {
    if (socketRef.current && inputValue.trim()) {
      socketRef.current.send(inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <h1>Chat Basic</h1>
      <span>Users : {JSON.stringify(selectedUser)}</span>

      <div>
        {messages.map(({ msj, username }, index) => (
          <div key={index}>
            <span>
              {username}: {msj}
            </span>
          </div>
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

      <h1>Select users</h1>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <button
              onClick={() => {
                setSelectedUser(user);
                console.log();
              }}
              style={{
                backgroundColor:
                  selectedUser.username === user.username
                    ? "lightblue"
                    : "white",
              }}
            >
              {user.username}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
