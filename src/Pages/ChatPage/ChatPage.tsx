// import { Chat } from "../../components/Chat/Chat";
import { useNavigate, useSearchParams } from "react-router";
import { Chat } from "../../components/Chat/Chat";
import { useAuthStore } from "../../stores/auth/auth.store";
import { useWebSocketStore } from "../../stores/websocket/websocket.store";
import { useEffect } from "react";
// import { useAuthStore } from "../../stores/auth/auth.store";

export interface Message {
  msj: string;
  username: string;
}

export const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomName = searchParams.get("roomName") || "general"; // Valor por defecto: "general"
  const currentUser = useAuthStore((state) => state.getUser());

  // Obtén las salas disponibles desde tu store
  const { availableRooms } = useWebSocketStore();

  // Efecto para validar la sala
  useEffect(() => {
    if (!availableRooms.includes(roomName)) {
      // Si la sala no existe...
      navigate("/dashboard/general", { replace: true }); // Redirige a la sala general
    }
  }, [roomName, availableRooms, navigate]);

  // Si la sala no es válida, muestra null mientras se redirige (opcional: añade un loader)
  if (!availableRooms.includes(roomName)) return null;

  return <Chat currentRoom={roomName} currentUser={currentUser} />;
};
