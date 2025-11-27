import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { User } from "@/UsersPage/context/types";

type ActiveUserResponse = {
  user: User;
};

const getActiveUser = async (
  axiosPrivate: AxiosInstance
): Promise<ActiveUserResponse> => {
  const response = await axiosPrivate.get("/auth/me");
  return response.data;
};

const useGetUser = () => {
  const { auth, setUser } = useUsersContext();
  const axiosPrivate = useAxiosPrivate();
  const getUserQuery = useQuery({
    queryKey: ["UserInfo"],
    queryFn: () => getActiveUser(axiosPrivate),
    enabled: !!auth?.AccessToken,
    refetchOnMount: true,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (getUserQuery.data && auth) {
      setUser({
        ...auth,
        user: getUserQuery.data.user,
      });
    }
  }, [getUserQuery.data]);
  return getUserQuery;
};

export default useGetUser;
