import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ToastMessage from "@/ToastMessage";

type orderItemsCredentialsType = {
  quantity: number;
  orderId: string;
};

const createOrderItems = async (
  credentials: orderItemsCredentialsType,
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
    mutationFn: (data: orderItemsCredentialsType) =>
      createOrderItems(data, axiosPrivate),
    onSuccess: () => {
      ToastMessage({ type: "success", message: "Liste créé !" });
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: () => {
      ToastMessage({
        type: "error",
        message: "Erreur lors de la création de liste.",
      });
    },
  });
  return {
    createOrderItemsMutation,
    createOrderItemsLoading,
  };
};
export default useCreateOrderItems;
