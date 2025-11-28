import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

const deleteOrder = async (axiosPrivate: AxiosInstance, id: string) => {
  const response = await axiosPrivate.delete(`/order/${id}`);
  return response.data;
};

const useDeleteOrder = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteOrderMutation,
    isPending: deleteOrderLoading,
  } = useMutation({
    mutationFn: async (id: string) => deleteOrder(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
  return {
    deleteOrderMutation,
    deleteOrderLoading,
  };
};

export default useDeleteOrder;
