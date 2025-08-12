// import { useState, useEffect, useRef } from "react";
// import { LoginForm } from "./components/LoginForm/LoginForm";
// import { Chat, type User } from "./components/Chat/Chat";
// import { UseCustomMsj } from "./CustomHooks/UseCustomMsj";

// export default function App() {
//   const socketRef = useRef<WebSocket | null>(null);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const { inputValue, setInputValue, setMessages, messages } = UseCustomMsj();
//   // Conetion to the WebSocket server
//   useEffect(() => {
//     // socketRef.current = new WebSocket("ws://localhost:3001");
//     if (!currentUser) return;
//     socketRef.current = new WebSocket(
//       `ws://localhost:3001?token=${currentUser.token}`
//     );
//     socketRef.current.onopen = () => {
//       console.log("Conextion WebSocket it established");
//     };

//     socketRef.current.onmessage = (event) => {
//       console.log("event", event);
//       const StringToJson = JSON.parse(event.data);
//       console.log("StringToJson", StringToJson);

//       setMessages((prev) => [
//         ...prev,
//         { msj: StringToJson.msj, username: StringToJson.username },
//       ]);
//     };

//     return () => {
//       socketRef.current?.close();
//     };
//   }, [currentUser, setMessages]);

//   const sendMessage = () => {
//     if (socketRef.current && inputValue.trim()) {
//       socketRef.current.send(inputValue);
//       setInputValue("");
//     }
//   };

//   if (!currentUser) {
//     return (
//       <div>
//         <LoginForm onLogin={setCurrentUser} />
//       </div>
//     );
//   }

//   return (
//     <Chat
//       messages={messages}
//       inputValue={inputValue}
//       setInputValue={setInputValue}
//       sendMessage={sendMessage}
//       currentUser={currentUser}
//     />
//   );
// }

import { Navigate, Outlet, useLocation } from "react-router";

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};
