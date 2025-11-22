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

const manufacturers = [
  {
    id: "1",
    name: "usine1",
    mailAdress: "usine1@yopmail.com",
    adress: "rue taha hassine - 4013",
    telephoneNumber: "+216 50889124",
    createdAt: "2025-10-01",
  },
  {
    id: "2",
    name: "usine2",
    mailAdress: "usine2@yopmail.com",
    adress: "rue d'independance - 4030",
    telephoneNumber: "+216 50889126",
    createdAt: "2025-09-15",
  },
];

const ManufacturersTable = () => {
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
      <TableCell className="text-center">{manufacturer.createdAt}</TableCell>
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
                {manufacturersRows}
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

export default ManufacturersTable;
