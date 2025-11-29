import { CustomInput } from "@/components/ui/CustomInput";
import { SearchIcon } from "@/assets/SearchIcon";
import AddUser from "./AddUser/AddUser";
import { useUsersContext } from "./context/useUsersContext";

type Props = {
  children: React.ReactNode;
};

const UsersPageLayout = (props: Props) => {
  const { searchWord, setSearchWord, auth } = useUsersContext();
  const userRole = auth?.user.role;
  return (
    <div className="h-full space-y-7">
      <div className="w-full space-y-3">
        <h2 className="text-2xl font-semibold">Gestion des utilisateurs</h2>
        <p className="text-justify text-text">
          Trouvez, filtrez et gérez rapidement les utilisateurs enregistrés dans
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
        {userRole === "ADMIN" && <AddUser />}
      </div>
      <div className="h-full" style={{ minHeight: "260px" }}>
        {props.children}
      </div>
    </div>
  );
};

export default UsersPageLayout;
