// websocketStore.ts

import { create } from "zustand";

interface Message {
  msj: string;
  username: string;
  room?: string;
  type?: "room_created" | "room_changed" | "error" | "message";
}

interface WebSocketState {
  socket: WebSocket | null;
  messages: Message[];
  currentRoom: string;
  availableRooms: string[];
  myRoom?: string;
  roomError: string | null; // Nuevo campo para errores
  connect: (token: string) => void;
  disconnect: () => void;
  joinRoom: (roomName: string) => void;
  sendMessage: (message: string) => void;
  clearRoomError: () => void; // Nuevo método para limpiar errores

  pendingRoom: string | null; // Nuevo estado para sala en proceso
  createRoom: (roomName: string) => void; // Ahora es void
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  messages: [],
  currentRoom: "general",
  availableRooms: ["general"],
  roomError: null, // Inicializado como null
  pendingRoom: null,

  connect: (token: string) => {
    get().socket?.close();

    const newSocket = new WebSocket(`ws://localhost:3001?tokenUser=${token}`);

    newSocket.onopen = () => {
      console.log("WebSocket conectado");
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const currentPendingRoom = get().pendingRoom;

      if (
        message.type === "room_created" &&
        currentPendingRoom === message.room
      ) {
        set((state) => ({
          availableRooms: [...state.availableRooms, message.room],
          pendingRoom: null, // Limpiar estado pendiente
          roomError: null,
        }));
      } else if (message.type === "error" && currentPendingRoom) {
        set({
          roomError: message.message,
          pendingRoom: null, // Limpiar estado pendiente
        });
      } else {
        // Manejo de otros mensajes (chats normales)
        set((state) => ({ messages: [...state.messages, message] }));
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket desconectado");
    };

    set({ socket: newSocket });
  },

  disconnect: () => {
    get().socket?.close();
    set({ socket: null, messages: [], currentRoom: "general" });
  },

  sendMessage: (message: string, room?: string) => {
    const socket = get().socket;
    const currentRoom = room || get().currentRoom;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          message: message,
          room: currentRoom,
        })
      );
    }
  },
  clearRoomError: () => set({ roomError: null }),

  createRoom: (roomName: string) => {
    const socket = get().socket;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      set({ roomError: "Not connected to server" });
      return;
    }

    // Resetear errores y marcar sala como pendiente
    set({
      roomError: null,
      pendingRoom: roomName,
    });

    // Enviar solicitud al servidor
    socket.send(
      JSON.stringify({
        type: "create_room",
        roomName: roomName,
      })
    );
  },

  joinRoom: (roomName: string) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomName: roomName,
        })
      );
      set({ currentRoom: roomName });
    }
  },
}));
