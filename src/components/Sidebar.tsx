import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
  const items = [
    {
      label: "Home",
      href: "/dashboard",
      icon: BsHouseFill,
    },
    {
      label: "Notificaciones",
      href: "/dashboard/notifications",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "/user/123",
      icon: FaUser,
    },
  ];
  return <div>sidebar</div>;
};

export default Sidebar;
