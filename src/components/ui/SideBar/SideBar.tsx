import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import StsLogo from "@/assets/StsLogo";

const SideBar = () => {
  return (
    <aside className="flex h-full w-64 flex-col bg-background">
      <div className="grow overflow-y-auto">
        <div className="flex flex-col items-center gap-8 p-4 h-full">
          <Link to="/" className="py-6">
            <StsLogo />
          </Link>
          <NavLinks />
        </div>
      </div>

      <div className="bg-primary p-4 text-white">
        <Link to="/my-profile" className="flex items-center space-x-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-semibold text-primary">
            FB
          </div>
          <div>
            <p className="font-semibold">Foulen ben Foulen</p>
            <p className="text-sm">Admin</p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
