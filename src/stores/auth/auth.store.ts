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
      console.log("authorized", authorized);

      const token = user.token;
      set({ status: authorized, token, user });
    } catch (error) {
      console.error("Login failed:", error);
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw "Unauthorized";
    }
  },

  logoutUser: () => {
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
