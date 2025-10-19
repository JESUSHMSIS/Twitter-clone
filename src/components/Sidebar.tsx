"use client";

import { BiLogOut } from "react-icons/bi";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: "Inicio",
      href: "/dashboard",
      icon: BsHouseFill,
    },
    {
      label: "Notificaciones",
      href: "/dashboard/notifications",
      icon: BsBellFill,
      auth: true,
    },
    {
      label: "Perfil",
      href: "/user/123",
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="col-sapn-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              label={item.label}
              icon={item.icon}
              href={item.href}
              auth={item.auth}
            />
          ))}
          {currentUser && (
            <SidebarItem
              icon={BiLogOut}
              label="Cerrar sesion"
              onClick={() => signOut()}
            />
          )}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
