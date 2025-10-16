import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
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
    },
    {
      label: "Perfil",
      href: "/user/123",
      icon: FaUser,
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
            />
          ))}
          <SidebarItem
            icon={BiLogOut}
            label="Cerrar sesion"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
