import SideBarLink from "./SideBarLink";
import { useLocation } from "react-router-dom";
import LogoutIcon from "@/assets/LogoutIcon";
import UserIcon from "@/assets/UserIcon";
import CommandIcon from "@/assets/CommandIcon";
import FabriquantIcon from "@/assets/FabriquantIcon";
import OrderIcon from "@/assets/OrderIcon";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";

const NavLinks = () => {
  const location = useLocation();
  const { auth } = useUsersContext();
  const userRole = auth?.user.role;
  const navData = [
    {
      to: "/commands",
      icon: <CommandIcon active={location.pathname.includes("/commands")} />,
      label: "Commandes",
      disabled: false,
      isActive: location.pathname.includes("/commands"),
      visible: ["GESTIONNAIRE", "ADMIN"].includes(userRole ?? "TECHNICIEN"),
    },
    {
      to: "/home",
      icon: <UserIcon active={location.pathname.includes("/home")} />,
      label: "Utilisateurs",
      disabled: false,
      isActive: location.pathname.includes("/home"),
      visible: ["GESTIONNAIRE", "ADMIN"].includes(userRole ?? "TECHNICIEN"),
    },

    {
      to: "/fabricants",
      icon: (
        <FabriquantIcon active={location.pathname.includes("/fabricants")} />
      ),
      label: "Fabriquants",
      disabled: false,
      isActive: location.pathname.includes("/fabricants"),
      visible: true,
    },
    {
      to: "/orders",
      icon: <OrderIcon active={location.pathname.includes("/orders")} />,
      label: "Ordrers de fabrication",
      disabled: false,
      isActive: location.pathname.includes("/orders"),
      visible: true,
    },
  ];

  const visibleLinks = navData.filter((navLink) => navLink.visible);

  return (
    <nav className="w-full space-y-20 flex flex-col justify-between h-full">
      <ul className="flex w-full flex-col items-center gap-6">
        {visibleLinks.map((nav) => {
          return (
            <SideBarLink
              key={nav.to}
              to={nav.to}
              icon={nav.icon}
              label={nav.label}
              disabled={nav.disabled}
              isActive={nav.isActive}
            />
          );
        })}
      </ul>

      <div>
        <SideBarLink
          to="/login"
          icon={<LogoutIcon />}
          label={"Se déconnecter"}
        />
      </div>
    </nav>
  );
};

export default NavLinks;
