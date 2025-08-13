// websocketStore.ts
import { create } from 'zustand';
interface Message {
  msj: string;
  username: string;
}

interface WebSocketState {
  socket: WebSocket | null;
  messages: Message[];
  connect: (token: string) => void;
  disconnect: () => void;
}

export const useWebSocketStore = create<WebSocketState>((set, get) => ({
  socket: null,
  messages: [],

  connect: (token: string) => {
    // Cierra la conexión anterior si existe
    get().socket?.close();

    const newSocket = new WebSocket(`ws://localhost:3001?tokenUser=${token}`);

    newSocket.onopen = () => {
      console.log("WebSocket conectado");
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data) as Message;
      set((state) => ({ messages: [...state.messages, message] }));
    };

    newSocket.onclose = () => {
      console.log("WebSocket desconectado");
    };

    set({ socket: newSocket });
  },

  disconnect: () => {
    get().socket?.close();
    set({ socket: null, messages: [] });
  },
}));