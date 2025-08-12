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
    <div>
      <h1>Chat Basic</h1>
      <span>Users : {JSON.stringify(currentUser)}</span>

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
    </div>
  );
};
