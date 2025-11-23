import type { User } from "@/UsersPage/context/types";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type getUserResponse = {
  message: string;
  user: User;
};

const getUser = async (): Promise<getUserResponse> => {
  const response = await axios.get("http://localhost:5000/api/v1/auth/me", {
    withCredentials: true,
  });
  return response.data;
};

const useGetUser = () => {
  const { setUser } = useUsersContext();
  const navigate = useNavigate();

  const { mutateAsync: getUserMutation } = useMutation({
    mutationFn: async () => {
      try {
        const data = await getUser();
        setUser({
          authenticated: true,
          user: data.user,
        });
        return data.user;
      } catch (error: unknown) {
        setUser({
          authenticated: false,
          user: {} as User,
        });
        navigate("/login");
        throw error;
      }
    },
  });
  return getUserMutation;
};

export default useGetUser;
