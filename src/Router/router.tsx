import { createBrowserRouter, Navigate } from "react-router";
import { Login } from "../Pages/Login/Login";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { App } from "../App";
import { ChatPage } from "../Pages/ChatPage/ChatPage";

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
            path: "general",
            element: <ChatPage />,
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
