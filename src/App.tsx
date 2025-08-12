import { Navigate, Outlet, useLocation } from "react-router";

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};
