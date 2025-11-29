import { CustomInput } from "@/components/ui/CustomInput";
import { SearchIcon } from "@/assets/SearchIcon";
import AddManufacturer from "./AddManufacturer/AddManufacturer";
import { useManufacturersContext } from "./context/useManufacturersContext";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";

type Props = {
  children: React.ReactNode;
};

const ManufacturersPageLayout = (props: Props) => {
  const { searchWord, setSearchWord } = useManufacturersContext();
  const { auth } = useUsersContext();
  const userRole = auth?.user.role;
  return (
    <div className="h-full space-y-7">
      <div className="w-full space-y-3">
        <h2 className="text-2xl font-semibold">Gestion des fabriquants</h2>
        <p className="text-justify text-text">
          Trouvez, filtrez et gérez rapidement les fabriquants enregistrés dans
          la plateforme.
        </p>
      </div>
      <div className="mb-5 flex w-full items-center justify-end gap-x-4">
        <div className="relative w-full max-w-xs">
          <div className="-translate-y-35 pointer-events-none absolute left-6 top-4 z-10 flex -translate-x-1/2 transform items-center">
            <SearchIcon />
          </div>
          <CustomInput
            id="rechercheInput"
            label=""
            className="rounded-lg border-[#E6E6E6] bg-[#FAFAFA] py-2 pl-12 pr-4"
            placeholder={"Rechercher"}
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </div>
        {["ADMIN", "GESTIONNAIRE"].includes(userRole ?? "TECHNICIEN") && (
          <AddManufacturer />
        )}
      </div>
      <div className="h-full" style={{ minHeight: "260px" }}>
        {props.children}
      </div>
    </div>
  );
};

export default ManufacturersPageLayout;
