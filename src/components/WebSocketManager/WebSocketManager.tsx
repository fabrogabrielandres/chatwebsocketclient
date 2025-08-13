import { useEffect } from 'react';
import { useAuthStore } from '../../stores/auth/auth.store';
import { useWebSocketStore } from '../../stores/websocket/websocket.store';

export const WebSocketManager = () => {
  const token = useAuthStore((state) => state.token);
  const { connect, disconnect } = useWebSocketStore();

  useEffect(() => {
    if (!token) return; // No hacer nada si no hay token
    
    connect(token); // Conexión inicial

    return () => {
      disconnect(); // Limpieza opcional (ej: si cambias de usuario)
    };
  }, [token]);

  return null;
};