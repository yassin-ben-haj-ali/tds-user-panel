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
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useGetUsers from "../hooks/useGetUsers";
import { useUsersContext } from "../context/useUsersContext";
import { formatDate } from "@/utils/functions";
import useDeleteUser from "../hooks/useDeleteUser";

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

const UsersTable = () => {
  const { ref, inView } = useInView();
  const { userList, auth } = useUsersContext();
  const getUsersQuery = useGetUsers({
    filters: auth?.user
      ? [
          {
            filterKey: "id",
            filterValue: auth.user.id,
            optionName: "user",
            customFilter: `where[id][not]=${auth.user.id}`,
          },
        ]
      : undefined,
  });
  const { deleteUserLoading, deleteUserMutation } = useDeleteUser();
  useEffect(() => {
    if (inView && getUsersQuery.hasNextPage) {
      getUsersQuery.fetchNextPage();
    }
  }, [inView, getUsersQuery.hasNextPage, getUsersQuery.fetchNextPage]);
  const usersRows = userList.map((user, index) => (
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
      <TableCell className="text-center">
        {formatDate(user.createdAt)}
      </TableCell>
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
                handleConfirm={async (e) => {
                  e.stopPropagation();
                  await deleteUserMutation(user.id);
                }}
                isLoading={deleteUserLoading}
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

  return (
    <>
      <CustomTable
        headers={headers}
        data={
          <>
            {getUsersQuery.isLoading ? (
              <TableRow>
                <TableCell colSpan={headers.length + 1} className="min-h-full">
                  <Loader className="flex h-full w-full items-center justify-center" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {usersRows}
                <TableRow ref={ref}>
                  <TableCell colSpan={headers.length + 1} className="h-full">
                    {getUsersQuery.isFetchingNextPage && (
                      <Loader className="flex w-full items-center justify-center" />
                    )}
                  </TableCell>
                </TableRow>
              </>
            )}
          </>
        }
        filterType="users"
        hasData={
          getUsersQuery.isLoading ||
          getUsersQuery?.data?.pages[0]?.totalCount !== 0
        }
      />
    </>
  );
};

export default UsersTable;
