import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { OrdersResponse } from "./useGetOrders";

const useGetInitialOrders = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["initialOrders"],
    queryFn: async (): Promise<OrdersResponse> => {
      const response = await axiosPrivate.get("/order/?skip=0&take=0");
      return response.data;
    },
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export default useGetInitialOrders;
