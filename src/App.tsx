import { Navigate, Outlet, useLocation } from "react-router";
import { WebSocketManager } from "./components/WebSocketManager/WebSocketManager";

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main>
      <WebSocketManager />
      <Outlet />
    </main>
  );
};
