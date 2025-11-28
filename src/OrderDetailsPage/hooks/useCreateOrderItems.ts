import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

type orderItemsCredentialsType={
   quantity:number;
   orderId:string
}

const createOrderItems = async (
  credentials:orderItemsCredentialsType,
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.post("/items/", credentials);
  return response.data;
};

const useCreateOrderItems = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: createOrderItemsMutation,
    isPending: createOrderItemsLoading,
  } = useMutation({
    mutationFn: (data: orderItemsCredentialsType) => createOrderItems(data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
  return {
    createOrderItemsMutation,
    createOrderItemsLoading,
  };
};
export default useCreateOrderItems;
