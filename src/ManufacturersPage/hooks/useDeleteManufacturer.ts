import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

const deleteManufacturer = async (axiosPrivate: AxiosInstance, id: string) => {
  const response = await axiosPrivate.delete(`/fabriquant/${id}`);
  return response.data;
};

const useDeleteManufacturer = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteManufacturerMutation,
    isPending: deleteManufacturerLoading,
  } = useMutation({
    mutationFn: async (id: string) => deleteManufacturer(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manufacturers"],
      });
    },
  });
  return {
    deleteManufacturerMutation,
    deleteManufacturerLoading,
  };
};

export default useDeleteManufacturer;
