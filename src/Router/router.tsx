import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "../Pages/Login/Login";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { App } from "../App";
import { ChatPage } from "../Pages/ChatPage/ChatPage";
import { CreateRoom } from "../components/CreateRoom/CreateRoom";
import { SelectRoom } from "../Pages/SelectRoom/SelectRoom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      /// Dashboard Routes
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "general", // <- Sin :roomName? (ahora usaremos query params)
            element: <ChatPage />,
          },
          {
            path: "createroom",
            element: <CreateRoom />,
          },
          {
            path: "selectRoom",
            element: <SelectRoom />,
          },
        ],
      },
      /// Auth Routes
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      {
        path: "*", // Cualquier ruta no coincidente
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
]);
