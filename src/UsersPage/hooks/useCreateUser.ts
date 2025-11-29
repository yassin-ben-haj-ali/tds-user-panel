import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { FormValues } from "../AddUser/AddUserType";
import ToastMessage from "@/ToastMessage";

const createUser = async (
  credentials: FormValues,
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.post("/user/", credentials);
  return response.data;
};

const useCreateUser = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync: createUserMutation, isPending: createUserLoading } =
    useMutation({
      mutationFn: (data: FormValues) => createUser(data, axiosPrivate),
      onSuccess: () => {
        ToastMessage({ type: "success", message: "Utilisateur créé !" });
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
      onError: () => {
        ToastMessage({
          type: "error",
          message: "Erreur lors de la création de l'utilisateur.",
        });
      },
    });
  return {
    createUserMutation,
    createUserLoading,
  };
};
export default useCreateUser;
