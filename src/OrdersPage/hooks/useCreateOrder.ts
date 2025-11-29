import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { FormValues } from "../AddOrder/AddOrderType";
import ToastMessage from "@/ToastMessage";

const createOrder = async (
  credentials: FormValues,
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.post("/order/", credentials);
  return response.data;
};

const useCreateOrder = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync: createOrderMutation, isPending: createOrderLoading } =
    useMutation({
      mutationFn: (data: FormValues) => createOrder(data, axiosPrivate),
      onSuccess: () => {
        ToastMessage({
          type: "success",
          message: "Commande de fabriquation créé !",
        });
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },
      onError: () => {
        ToastMessage({
          type: "error",
          message: "Erreur lors de la création de commande de fabriquation.",
        });
      },
    });
  return {
    createOrderMutation,
    createOrderLoading,
  };
};
export default useCreateOrder;
