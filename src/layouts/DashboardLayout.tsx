import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/auth/auth.store";

export const DashboardLayout = () => {
  const authStatus = useAuthStore((state) => state.status);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === "pending") {
    checkAuthStatus();
    return <>Loading...</>;
  }

  if (authStatus === "unauthorized") {
    return <Navigate to="/auth/login" />;
  }



  return (
    <div className="bg-slate-200 overflow-y-scroll w-screen h-screen antialiased text-slate-900 selection:bg-blue-900 selection:text-white">
      <div className="flex flex-row relative w-screen">
        {/* <SideMenu /> */}
        <h1>sidebar</h1>

        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
