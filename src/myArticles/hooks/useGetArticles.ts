import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { AxiosInstance } from "axios";
import type { Article } from "../context/types";
import { useArticlesContext } from "../context/useArticleContext";
import useDebounce from "@/hooks/useDebounce";
type Filters = {
  where?: Record<string, string>;
  orderBy?: {
    key: string;
    value: "asc" | "desc";
  };
};
export type ArticlesResponse = {
  paginatedResult: Article[];
  totalCount: number;
};

const take = 6;
const fetchArticles = async (
  {
    pageParam = 0,
    status,
    debouncedSearchWord,
  }: {
    pageParam: number;
    debouncedSearchWord: string;
    status?: string;
  },
  axiosPrivate: AxiosInstance,
  filters?: Filters
): Promise<ArticlesResponse> => {
  let url = `/article/?skip=${pageParam * take}&take=${take}`;

  if (status !== undefined && status != "tous") {
    url += `&where[status]=${status}`;
  }

  if (debouncedSearchWord) {
    url += `&where[number][contains]=${debouncedSearchWord}`;
    url += "&where[number][mode]=insensitive";
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

const useGetArticles = (
  status: string | undefined,
  options?: { filters?: Filters; enabled?: boolean }
) => {
  const axiosPrivate = useAxiosPrivate();

  const { searchWord } = useArticlesContext();

  const debouncedSearchWord = useDebounce(searchWord);
  return useInfiniteQuery({
    queryKey: ["articles", status, debouncedSearchWord],
    queryFn: ({ pageParam }) =>
      fetchArticles(
        { pageParam, status, debouncedSearchWord },
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

export default useGetArticles;
