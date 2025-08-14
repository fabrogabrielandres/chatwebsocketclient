import { useLocation } from "react-router";
import { Chat } from "../../components/Chat/Chat";
import { useAuthStore } from "../../stores/auth/auth.store";

export interface Message {
  msj: string;
  username: string;
}

export const ChatPage = () => {

   const location = useLocation();
  
  console.log(location.pathname); // Muestra la ruta actual
  

  const currentUser = useAuthStore((state) => state.getUser());
  return <Chat currentRoom="general" currentUser={currentUser} />;
};
