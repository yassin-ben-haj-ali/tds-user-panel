import CustomTable from "@/components/ui/CustomTable";
import { TableCell, TableRow } from "@/components/ui/table";
import Loader from "@/components/ui/Loader/Loader";
import ViewUserInfo from "../ViewUser/ViewUser";
import ViewIcon from "@/assets/ViewIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddUser from "../AddUser/AddUser";
import ConfirmModal from "@/layouts/ConfirmModal";

const headers = [
  {
    optionName: "see",
    headerTitle: "Aperçus",
    filterParams: {
      hideOrder: true,
      hideSearch: true,
    },
  },
  {
    optionName: "name",
    headerTitle: "Nom et Prénom",
  },
  {
    optionName: "email",
    headerTitle: "email",
    filterParams: {
      hideOrder: true,
      hideSearch: true,
    },
  },
  {
    optionName: "role",
    headerTitle: "Rôle",
    filterParams: {
      hideOrder: true,
    },
  },
  {
    optionName: "createdAt",
    headerTitle: "Date de création",
    filterParams: {
      hideSearch: true,
    },
  },
];

const users = [
  {
    id: "1",
    firstName: "gestionnaire1",
    lastName: "ben younes",
    mailAdress: "test@yopmail.com",
    role: "Gestionnaire",
    telephoneNumber: "+216 50889124",
    createdAt: "2023-10-01",
  },
  {
    id: "2",
    firstName: "foulen",
    lastName: "ben foulen",
    mailAdress: "foulen@yopmail.com",
    role: "Technicien",
    telephoneNumber: "+216 50889126",
    createdAt: "2023-09-15",
  },
  {
    id: "3",
    firstName: "admin",
    lastName: "super",
    mailAdress: "admin@yopmail.com",
    role: "Administrateur",
    telephoneNumber: "+216 50889123",
    createdAt: "2023-08-20",
  },
];

const UsersTable = () => {
  const usersRows = users.map((user, index) => (
    <TableRow key={index}>
      <TableCell className="text-center font-medium">
        <ViewUserInfo
          id={user?.id}
          showingComponent={<ViewIcon />}
          userData={{ data: user, isLoading: false }}
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        {user.firstName} {user.lastName}
      </TableCell>
      <TableCell className="text-center">{user.mailAdress}</TableCell>
      <TableCell className="text-center">{user.role}</TableCell>
      <TableCell className="text-center">{user.createdAt}</TableCell>
      <TableCell className="text-center flex items-center justify-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button tabIndex={0}>
                <AddUser editMode user={user} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Modifier</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger type="button">
              <ConfirmModal
                type="delete"
                title={"Êtes-vous sûr de vouloir supprimer l'utilisateur"}
                description={""}
                handleConfirm={(e) => {
                  e.stopPropagation();
                }}
                isLoading={false}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>supprimer</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  ));

  const isFetchingNextPage = false;
  const isLoading = false;

  return (
    <>
      <CustomTable
        headers={headers}
        data={
          <>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={headers.length + 1} className="min-h-full">
                  <Loader className="flex h-full w-full items-center justify-center" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {usersRows}
                <TableRow>
                  <TableCell colSpan={headers.length + 1} className="h-full">
                    {isFetchingNextPage && (
                      <Loader className="flex w-full items-center justify-center" />
                    )}
                  </TableCell>
                </TableRow>
              </>
            )}
          </>
        }
        filterType="users"
        hasData={true}
      />
    </>
  );
};

export default UsersTable;
