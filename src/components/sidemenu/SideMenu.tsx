import { IoLogOutOutline } from "react-icons/io5";
import { useAuthStore } from "../../stores/auth/auth.store";
import { SideMenuItem } from "./SideMenuItem";
import "../sidemenu/SideMenu.css"

interface MenuItem {
  title: string;
  subTitle: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    title: "General Chat",
    subTitle: "open to everyone",
    href: "/dashboard/general",
  },
  {
    title: "Create private room Chat",
    subTitle: "Could you invite",
    href: "/dashboard/createroom",
  },
  {
    title: "select room Chat",
    subTitle: "Could you join to a room",
    href: "/dashboard/selectRoom",
  },
];

export const SideMenu = () => {
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const userName = useAuthStore((state) => state.getUser()?.username || "User");

  return (
    <div
      id="menu"
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0 "
    >
      {/*  Profile */}
      <div id="profile" className="px-6 py-10">
        <p className="text-slate-500">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <img
              className="rounded-full w-8 h-8"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              alt=""
            />
          </span>
          <span className="text-sm md:text-base font-bold">{userName}</span>
        </a>
      </div>

      {/* Menu Items */}
      <nav id="nav" className="w-full px-6">
        {menuItems.map((item) => (
          <SideMenuItem key={item.href} {...item} />
        ))}

        {/* Logout */}
          <a onClick={logoutUser} className="mt-10">
          <div>
            <IoLogOutOutline />
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-slate-300 font-bold leading-5">
              Logout
            </span>
            <span className="text-sm text-slate-500 hidden md:block">
              Cerrar sesión
            </span>
          </div>
        </a>
      </nav>
    </div>
  );
};
