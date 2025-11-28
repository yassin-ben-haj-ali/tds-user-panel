import CustomTable from "@/components/ui/CustomTable";
import { TableCell, TableRow } from "@/components/ui/table";
import Loader from "@/components/ui/Loader/Loader";
import ViewIcon from "@/assets/ViewIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddManufacturer from "../AddManufacturer/AddManufacturer";
import ConfirmModal from "@/layouts/ConfirmModal";
import ViewManufacturerInfo from "../ViewManufacturer/ViewManufacturer";
import useGetManufacturers from "../hooks/useGetManufacturers";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useManufacturersContext } from "../context/useManufacturersContext";
import { formatDate } from "@/utils/functions";
import useDeleteManufacturer from "../hooks/useDeleteManufacturer";

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
    headerTitle: "Nom",
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
    optionName: "adress",
    headerTitle: "adress",
    filterParams: {
      hideOrder: true,
      hideSearch: true,
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

const ManufacturersTable = () => {
  const { ref, inView } = useInView();
  const { manufacturers } = useManufacturersContext();
  const getManufacturersQuery = useGetManufacturers();
  const { deleteManufacturerMutation, deleteManufacturerLoading } =
    useDeleteManufacturer();

  useEffect(() => {
    if (inView && getManufacturersQuery.hasNextPage) {
      getManufacturersQuery.fetchNextPage();
    }
  }, [
    inView,
    getManufacturersQuery.hasNextPage,
    getManufacturersQuery.fetchNextPage,
  ]);
  const manufacturersRows = manufacturers.map((manufacturer, index) => (
    <TableRow key={index}>
      <TableCell className="text-center font-medium">
        <ViewManufacturerInfo
          id={manufacturer?.id}
          showingComponent={<ViewIcon />}
          manufacturerData={{ data: manufacturer, isLoading: false }}
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        {manufacturer.name}
      </TableCell>
      <TableCell className="text-center">{manufacturer.mailAdress}</TableCell>
      <TableCell className="text-center font-medium">
        {manufacturer.adress}
      </TableCell>
      <TableCell className="text-center">
        {formatDate(manufacturer.createdAt)}
      </TableCell>
      <TableCell className="text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button tabIndex={0}>
                <AddManufacturer editMode manufacturer={manufacturer} />
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
                title={"Êtes-vous sûr de vouloir supprimer le fabriquant"}
                description={""}
                handleConfirm={async (e) => {
                  e.stopPropagation();
                  await deleteManufacturerMutation(manufacturer.id);
                }}
                isLoading={deleteManufacturerLoading}
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
            {getManufacturersQuery.isLoading ? (
              <TableRow>
                <TableCell colSpan={headers.length + 1} className="min-h-full">
                  <Loader className="flex h-full w-full items-center justify-center" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {manufacturersRows}
                <TableRow ref={ref}>
                  <TableCell colSpan={headers.length + 1} className="h-full">
                    {getManufacturersQuery.isFetchingNextPage && (
                      <Loader className="flex w-full items-center justify-center" />
                    )}
                  </TableCell>
                </TableRow>
              </>
            )}
          </>
        }
        filterType="manufacturers"
        hasData={
          getManufacturersQuery.isLoading ||
          getManufacturersQuery?.data?.pages[0]?.totalCount !== 0
        }
      />
    </>
  );
};

export default ManufacturersTable;
