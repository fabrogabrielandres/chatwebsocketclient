import { Chat, type User } from "../../components/Chat/Chat";
import { useAuthStore } from "../../stores/auth/auth.store";
import UseSocket from "../../CustomHooks/UseSocket";

export interface Message {
  msj: string;
  username: string;
}

export const ChatPage = () => {
  
  const currentUser = useAuthStore((state) => state.getUser()) as User | null;
  

  const { socketRef, messages } = UseSocket({ currentUser });

  // Conetion to the WebSocket server

  return <Chat socketRef={socketRef} messages={messages} currentUser={currentUser} />;
};
