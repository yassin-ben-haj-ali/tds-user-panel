import axios from "@/api/axios";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import { useMutation } from "@tanstack/react-query";

const logout = async (token?: string) => {
  const response = await axios.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const useLogout = () => {
  const { auth, setUser } = useUsersContext();
  const { mutateAsync: logoutMutation, isPending: logoutLoading } = useMutation(
    {
      mutationFn: () => logout(auth?.AccessToken),
      onSuccess: () => {
        localStorage.removeItem("acces-token");
        setUser(null);
      },
    }
  );
  return {
    logoutMutation,
    logoutLoading,
  };
};
export default useLogout;
