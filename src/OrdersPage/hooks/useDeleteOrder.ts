import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ToastMessage from "@/ToastMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

const deleteOrder = async (axiosPrivate: AxiosInstance, id: string) => {
  const response = await axiosPrivate.delete(`/order/${id}`);
  return response.data;
};

const useDeleteOrder = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteOrderMutation, isPending: deleteOrderLoading } =
    useMutation({
      mutationFn: async (id: string) => deleteOrder(axiosPrivate, id),
      onSuccess: () => {
        ToastMessage({
          type: "success",
          message: "Order de fabrication supprimé !",
        });
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
      },
      onError: () => {
        ToastMessage({
          type: "error",
          message: "Erreur lors de la suppression d'ordre de fabrication.",
        });
      },
    });
  return {
    deleteOrderMutation,
    deleteOrderLoading,
  };
};

export default useDeleteOrder;
