import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import { useEffect } from "react";
import { useOrdersContext } from "@/OrdersPage/context/useOrderContext";
import type { OrderItem } from "@/OrdersPage/context/types";
import type { TableFilter } from "@/UsersPage/context/types";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";

const take = 10;

export type UsersResponse = {
  paginatedResult: OrderItem[];
  totalCount: number;
};

const getOrderItems = async (
  pageParam: number,
  filters: TableFilter[],
  axiosPrivate: AxiosInstance,
  options?: {
    filters?: TableFilter[];
    enabled?: boolean;
    take?: number | null;
  }
): Promise<UsersResponse> => {
  const mergedFilters = [...(filters || []), ...(options?.filters || [])];
  let where = mergedFilters
    .filter((filter) => {
      // Remove 'keyword' filter if both 'keyword' and 'radio' are present
      if (
        filter.filterKey === "keyword" &&
        filters.some(
          (f) => f.filterKey === "radio" && f.optionName === filter.optionName
        )
      ) {
        return false;
      }
      // Exclude 'order' filters
      return filter.filterKey !== "order";
    })
    .map((filter) =>
      filter?.customFilter
        ? filter.customFilter
        : `where[${filter.optionName}][contains]=${encodeURIComponent(
            filter.filterValue
          )}&where[${filter.optionName}][mode]=insensitive`
    )
    .join("&");

  where = where ? `&${where}` : "";
  let orderBy = filters
    .filter((filter) => filter.filterKey === "order")
    .map((filter) =>
      filter?.customOrder
        ? filter.customOrder
        : `orderBy[${filter.optionName}]=${filter.filterValue}`
    )
    .join("&");
  if (!orderBy) {
    orderBy = "orderBy[createdAt]=asc";
  }

  const response = await axiosPrivate.get(
    `/items/?skip=${pageParam * take}&take=${take}&${where}&${orderBy}`
  );
  return response.data;
};
const useGetOrderItems = (options?: {
  filters?: TableFilter[];
  enabled?: boolean;
  take?: number | null;
}) => {
  const { tableFilters } = useUsersContext();
  const { setOrderItems } = useOrdersContext();
  const filters = tableFilters.users;
  const axiosPrivate = useAxiosPrivate();
  const orderItemsQuery = useInfiniteQuery({
    queryKey: ["items", filters, options],
    queryFn: ({ pageParam = 0 }) => {
      return getOrderItems(pageParam, filters, axiosPrivate, options);
    },
    enabled: options?.enabled !== undefined ? options.enabled : true,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const pageNumbers = Math.ceil(lastPage.totalCount / take);
      const currentPage = allPages.length;
      if (currentPage < pageNumbers) {
        return currentPage;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (orderItemsQuery.data) {
      setOrderItems(
        orderItemsQuery.data.pages.map((page) => page.paginatedResult).flat()
      );
    }
  }, [orderItemsQuery.data]);
  return orderItemsQuery;
};

export default useGetOrderItems;
