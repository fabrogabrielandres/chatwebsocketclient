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
  connect: (token: string) => void;
  disconnect: () => void;
  createRoom: (roomName: string) => void;
  joinRoom: (roomName: string) => void;
  sendMessage: (message: string) => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  messages: [],
  currentRoom: "general",
  availableRooms: ["general"],

  connect: (token: string) => {
    get().socket?.close();

    const newSocket = new WebSocket(`ws://localhost:3001?tokenUser=${token}`);

    newSocket.onopen = () => {
      console.log("WebSocket conectado");
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "room_created") {
        set((state) => ({
          availableRooms: [...state.availableRooms, message.room],
          currentRoom: message.room,
        }));
      } else {
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

  createRoom: (roomName: string) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "create_room",
          roomName: roomName,
        })
      );
    }
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
