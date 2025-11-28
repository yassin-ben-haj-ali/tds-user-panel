import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import { useEffect } from "react";
import type { TableFilter, User } from "../context/types";
import { useUsersContext } from "../context/useUsersContext";

const take = 10;

export type UsersResponse = {
  paginatedResult: User[];
  totalCount: number;
};

const getUsers = async (
  pageParam: number,
  filters: TableFilter[],
  searchFilter: string,
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
  const searchQuery = searchFilter
    ? `where[OR][0][firstName][contains]=${encodeURIComponent(
        searchFilter
      )}&where[OR][0][firstName][mode]=insensitive` +
      `&where[OR][1][lastName][contains]=${encodeURIComponent(
        searchFilter
      )}&where[OR][1][lastName][mode]=insensitive`
    : "";
  const response = await axiosPrivate.get(
    `/user/?skip=${
      pageParam * take
    }&take=${take}&${where}&${orderBy}&${searchQuery}`
  );
  return response.data;
};
const useGetUsers = (options?: {
  filters?: TableFilter[];
  enabled?: boolean;
  take?: number | null;
}) => {
  const { tableFilters, setUsers, searchWord } = useUsersContext();
  const filters = tableFilters.users;
  const axiosPrivate = useAxiosPrivate();
  const usersQuery = useInfiniteQuery({
    queryKey: ["users", filters, searchWord, options],
    queryFn: ({ pageParam = 0 }) => {
      return getUsers(pageParam, filters, searchWord, axiosPrivate, options);
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
    if (usersQuery.data) {
      setUsers(
        usersQuery.data.pages.map((page) => page.paginatedResult).flat()
      );
    }
  }, [usersQuery.data]);
  return usersQuery;
};

export default useGetUsers;
