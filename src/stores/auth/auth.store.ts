import { devtools, persist } from "zustand/middleware";
import type { AuthStatus } from "../../interfaces/auth.interface";
import type { User } from "../../components/Chat/Chat";
import { create, type StateCreator } from "zustand";
import { AuthService } from "../../services/auth.service";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {

    try {
      const { authorized, user } = await AuthService.login(email, password);
      console.log("authorized",authorized);
      
      const token = user.token;      
      set({ status: authorized, token, user });
    } catch (error) {
      console.error("Login failed:", error);
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw "Unauthorized";
    }
  },

  checkAuthStatus: async () => {
    try {
      const { authorized, user } = await AuthService.checkStatus();
      const token = user.token;
      set({ status: authorized, token, user });
    } catch (error) {
      console.log("Check status failed:", error);

      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },

  logoutUser: () => {
    set({ status: "unauthorized", token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);
