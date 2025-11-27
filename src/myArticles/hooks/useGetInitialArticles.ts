import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { ArticlesResponse } from "./useGetArticles";

const useGetInitialArticles = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["initialArticles"],
    queryFn: async (): Promise<ArticlesResponse> => {
      const response = await axiosPrivate.get("/article/?skip=0&take=0");
      return response.data;
    },
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export default useGetInitialArticles;
