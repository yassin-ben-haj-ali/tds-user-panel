import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { FormValues } from "../AddUser/AddUserType";

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
  const {
    mutateAsync: createUserMutation,
    isPending: createUserLoading,
  } = useMutation({
    mutationFn: (data: FormValues) => createUser(data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
  return {
    createUserMutation,
    createUserLoading,
  };
};
export default useCreateUser;
