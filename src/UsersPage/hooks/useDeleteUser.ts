import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

const deleteUser = async (axiosPrivate: AxiosInstance, id: string) => {
  const response = await axiosPrivate.delete(`/user/${id}`);
  return response.data;
};

const useDeleteUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteUserMutation,
    isPending: deleteUserLoading,
  } = useMutation({
    mutationFn: async (id: string) => deleteUser(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
  return {
    deleteUserMutation,
    deleteUserLoading,
  };
};

export default useDeleteUser;
