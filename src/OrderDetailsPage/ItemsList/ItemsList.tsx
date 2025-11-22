import CustomTable from "@/components/ui/CustomTable";
import { TableCell, TableRow } from "@/components/ui/table";
import Loader from "@/components/ui/Loader/Loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ConfirmModal from "@/layouts/ConfirmModal";

const headers = [
  {
    optionName: "quantity",
    headerTitle: "Quantité",
    filterParams: {
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

const items = [
  {
    id: "1",
    number: 150,
    createdAt: "2025-10-01",
  },
  {
    id: "2",
    number: 350,
    createdAt: "2025-09-15",
  },
];

const ItemsTable = () => {
  const itemsRows = items.map((item, index) => (
    <TableRow key={index}>
      <TableCell className="text-center font-medium">{item.number}</TableCell>
      <TableCell className="text-center font-medium">
        {item.createdAt}
      </TableCell>
      <TableCell className="text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button tabIndex={0}></button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Modifier</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger type="button">
              <ConfirmModal
                type="delete"
                title={
                  "Êtes-vous sûr de vouloir supprimer la quantité travaillé"
                }
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
                {itemsRows}
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

export default ItemsTable;
