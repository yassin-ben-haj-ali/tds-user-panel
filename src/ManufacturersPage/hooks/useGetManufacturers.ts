import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import { useEffect } from "react";
import type { TableFilter } from "@/UsersPage/context/types";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import { useManufacturersContext } from "../context/useManufacturersContext";
import type { Manufacturer } from "../context/types";

const take = 10;

export type ManufacturersResponse = {
  paginatedResult: Manufacturer[];
  totalCount: number;
};

const getManufacturers = async (
  pageParam: number,
  filters: TableFilter[],
  searchFilter: string,
  axiosPrivate: AxiosInstance,
  options?: {
    filters?: TableFilter[];
    enabled?: boolean;
    take?: number | null;
  }
): Promise<ManufacturersResponse> => {
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
  const searchQuery = searchFilter
    ? `where[name][contains]=${encodeURIComponent(
        searchFilter
      )}&where[name][mode]=insensitive`
    : "";
  const response = await axiosPrivate.get(
    `fabriquant/?skip=${
      pageParam * take
    }&take=${take}&${where}&${orderBy}&${searchQuery}`
  );
  return response.data;
};
const useGetManufacturers = (options?: {
  filters?: TableFilter[];
  enabled?: boolean;
  take?: number | null;
}) => {
  const { tableFilters } = useUsersContext();
  const filters = tableFilters.manufacturers;
  const { searchWord, setManufacturers } = useManufacturersContext();
  const axiosPrivate = useAxiosPrivate();
  const manufacturersQuery = useInfiniteQuery({
    queryKey: ["manufacturers", filters, searchWord, options], // Include siteId in the query key
    queryFn: ({ pageParam = 0 }) => {
      return getManufacturers(
        pageParam,
        filters,
        searchWord,
        axiosPrivate,
        options
      );
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
    if (manufacturersQuery.data) {
      setManufacturers(
        manufacturersQuery.data.pages.map((page) => page.paginatedResult).flat()
      );
    }
  }, [manufacturersQuery.data]);
  return manufacturersQuery;
};

export default useGetManufacturers;
