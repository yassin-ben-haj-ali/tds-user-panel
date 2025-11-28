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
import { useInView } from "react-intersection-observer";
import { useOrdersContext } from "@/OrdersPage/context/useOrderContext";
import useGetOrderItems from "../hooks/useGetOrderItems";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "@/utils/functions";
import useDeleteItems from "../hooks/useDeleteItems";

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

const ItemsTable = () => {
  const { ref, inView } = useInView();
  const { id } = useParams();
  const { orderItems } = useOrdersContext();
  const getOrderItemsQuery = useGetOrderItems({
    filters: id
      ? [
          {
            filterKey: "id",
            filterValue: id,
            optionName: "user",
            customFilter: `where[order][id]=${id}`,
          },
        ]
      : undefined,
    enabled: !!id,
  });
  const { deleteItemsLoading, deleteItemsMutation } = useDeleteItems();
  useEffect(() => {
    if (inView && getOrderItemsQuery.hasNextPage) {
      getOrderItemsQuery.fetchNextPage();
    }
  }, [
    inView,
    getOrderItemsQuery.hasNextPage,
    getOrderItemsQuery.fetchNextPage,
  ]);

  const itemsRows = orderItems.map((item, index) => (
    <TableRow key={index}>
      <TableCell className="text-center font-medium">{item.quantity}</TableCell>
      <TableCell className="text-center font-medium">
        {formatDate(item.createdAt)}
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
                handleConfirm={async (e) => {
                  e.stopPropagation();
                  await deleteItemsMutation(item.id);
                }}
                isLoading={deleteItemsLoading}
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
            {getOrderItemsQuery.isLoading ? (
              <TableRow>
                <TableCell colSpan={headers.length + 1} className="min-h-full">
                  <Loader className="flex h-full w-full items-center justify-center" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {itemsRows}
                <TableRow ref={ref}>
                  <TableCell colSpan={headers.length + 1} className="h-full">
                    {getOrderItemsQuery.isFetchingNextPage && (
                      <Loader className="flex w-full items-center justify-center" />
                    )}
                  </TableCell>
                </TableRow>
              </>
            )}
          </>
        }
        filterType="items"
        hasData={
          getOrderItemsQuery.isLoading ||
          getOrderItemsQuery?.data?.pages[0]?.totalCount !== 0
        }
      />
    </>
  );
};

export default ItemsTable;
