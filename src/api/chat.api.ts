import axios from "axios";
import { useAuthStore } from "../stores/auth/auth.store";

const chatApi = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Todo: interceptors
// Leer el store de Zustand
chatApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  // console.log({token});

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { chatApi };
