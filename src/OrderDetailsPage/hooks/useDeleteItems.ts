import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

const deleteItems = async (axiosPrivate: AxiosInstance, id: string) => {
  const response = await axiosPrivate.delete(`/items/${id}`);
  return response.data;
};

const useDeleteItems = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteItemsMutation,
    isPending: deleteItemsLoading,
  } = useMutation({
    mutationFn: async (id: string) => deleteItems(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
    },
  });
  return {
    deleteItemsMutation,
    deleteItemsLoading,
  };
};

export default useDeleteItems;
