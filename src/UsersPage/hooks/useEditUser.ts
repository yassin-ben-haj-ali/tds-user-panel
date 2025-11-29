import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ToastMessage from "@/ToastMessage";

type EditUserCredentials = {
  firstName?: string;
  lastName?: string;
  role?: string;
  mailAdress?: string;
  telephoneNumber?: string;
  countryCode?: string;
};

const editUser = async (
  credentials: EditUserCredentials,
  userId: string,
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.patch(`/user/${userId}`, credentials);
  return response.data;
};

const useEditUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync: editUserMutation, isPending: editUserLoading } =
    useMutation({
      mutationFn: ({ data, id }: { id: string; data: EditUserCredentials }) =>
        editUser(data, id, axiosPrivate),
      onSuccess: () => {
        ToastMessage({
          type: "success",
          message: "Utilisateur mis à jour !",
        });
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
      onError: () => {
        ToastMessage({
          type: "error",
          message: "Une erreur est survenue lors de la mise à jour.",
        });
      },
    });
  return {
    editUserMutation,
    editUserLoading,
  };
};
export default useEditUser;
