import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { AxiosInstance } from "axios";
import useDebounce from "@/hooks/useDebounce";
import { useOrdersContext } from "../context/useOrderContext";
import type { Order } from "../context/types";
type Filters = {
  where?: Record<string, string>;
  orderBy?: {
    key: string;
    value: "asc" | "desc";
  };
};
export type OrdersResponse = {
  paginatedResult: Order[];
  totalCount: number;
};

const take = 6;
const fetchOrders = async (
  {
    pageParam = 0,
    debouncedSearchWord,
  }: {
    pageParam: number;
    debouncedSearchWord: string;
  },
  axiosPrivate: AxiosInstance,
  filters?: Filters
): Promise<OrdersResponse> => {
  let url = `/order/?skip=${pageParam * take}&take=${take}`;
  if (debouncedSearchWord) {
    url += `&where[article][number][contains]=${debouncedSearchWord}`;
    url += "&where[article][number][mode]=insensitive";
  }
  if (filters) {
    const where = Object.entries(filters.where || {})
      .map(([key, value]) => `where[${key}]=${value === "None" ? "" : value}`)
      .join("&");
    const orderBy = filters.orderBy
      ? `orderBy[${filters.orderBy.key}]=${filters.orderBy.value}`
      : "";

    url += (where ? "&" + where : "") + (orderBy ? "&" + orderBy : "");
  }
  const response = await axiosPrivate.get(url);
  return response.data;
};

const useGetOrders = (options?: { filters?: Filters; enabled?: boolean }) => {
  const axiosPrivate = useAxiosPrivate();

  const { searchWord } = useOrdersContext();

  const debouncedSearchWord = useDebounce(searchWord);
  return useInfiniteQuery({
    queryKey: ["orders", debouncedSearchWord],
    queryFn: ({ pageParam }) =>
      fetchOrders(
        { pageParam, debouncedSearchWord },
        axiosPrivate,
        options?.filters
      ),
    initialPageParam: 0,
    enabled: options?.enabled !== false,
    getNextPageParam: (lastPage, allPages) => {
      const pageNumbers = Math.ceil(lastPage.totalCount / take);
      const currentPage = allPages.length;
      if (currentPage < pageNumbers && currentPage !== pageNumbers) {
        return currentPage;
      }
      return undefined;
    },
  });
};

export default useGetOrders;
