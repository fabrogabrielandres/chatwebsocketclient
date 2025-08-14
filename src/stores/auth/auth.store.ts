import { devtools, persist } from "zustand/middleware";
import type { AuthStatus } from "../../interfaces/auth.interface";
import { create, type StateCreator } from "zustand";
import { AuthService } from "../../services/auth.service";
import { useWebSocketStore } from "../websocket/websocket.store";

export interface User {
  username: string;
  token: string;
  password: string;
  id: string;
}

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  getUser: () => User | undefined;
  getToken: () => string | undefined;
}

const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { authorized, user } = await AuthService.login(email, password);
      const token = user.token;
      set({ status: authorized, token, user });

      // Conecta el WebSocket después del login
      if (authorized === "authorized") {
        useWebSocketStore.getState().connect(token);
      }
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw error;
    }
  },

  logoutUser: () => {
    // Desconecta el WebSocket al hacer logout
    useWebSocketStore.getState().disconnect();
    set({ status: "unauthorized", token: undefined, user: undefined });
  },
  getUser: () => {
    return get().user;
  },
  getToken: () => {
    return get().token;
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);
