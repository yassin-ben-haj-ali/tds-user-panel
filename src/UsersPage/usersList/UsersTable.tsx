import CustomTable from "@/components/ui/CustomTable";
import { TableCell, TableRow } from "@/components/ui/table";
import Loader from "@/components/ui/Loader/Loader";

const headers = [
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
    firstName: "gestionnaire1",
    lastName: "ben younes",
    email: "test@yopmail.com",
    role: "gestionnaire",
    createdAt: "2023-10-01",
  },
  {
    firstName: "foulen",
    lastName: "ben foulen",
    email: "foulen@yopmail.com",
    role: "Technicien",
    createdAt: "2023-09-15",
  },
  {
    firstName: "admin",
    lastName: "super",
    email: "admin@yopmail.com",
    role: "Administrateur",
    createdAt: "2023-08-20",
  },
];

const UsersTable = () => {
  const usersRows = users.map((user, index) => (
    <TableRow key={index}>
      <TableCell className="text-center font-medium">
        {user.firstName} {user.lastName}
      </TableCell>
      <TableCell className="text-center">{user.email}</TableCell>
      <TableCell className="text-center">{user.role}</TableCell>
      <TableCell className="text-center">{user.createdAt}</TableCell>
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
