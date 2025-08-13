import { Chat, type User } from "../../components/Chat/Chat";
import { useAuthStore } from "../../stores/auth/auth.store";

export interface Message {
  msj: string;
  username: string;
}

export const ChatPage = () => {
  
  const currentUser = useAuthStore((state) => state.getUser()) as User | null;

  return <Chat currentUser={currentUser} />;
};
