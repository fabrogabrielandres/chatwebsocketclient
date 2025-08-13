import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../stores/auth/auth.store";
import { SideMenu } from "../components/sidemenu/SideMenu";

export const DashboardLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const location = useLocation();

  if (location.pathname === "/dashboard") {
    return <Navigate to="/dashboard/general" />;
  }

  if (authStatus === "unauthorized" || authStatus === "pending") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="bg-slate-200 w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="flex flex-row relative w-screen">
        <SideMenu />

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
