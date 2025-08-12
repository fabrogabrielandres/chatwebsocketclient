
import { Outlet } from 'react-router';

export const DashboardLayout = () => {
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