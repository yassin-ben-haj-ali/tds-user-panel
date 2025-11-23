import type { User } from "@/UsersPage/context/types";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type loginCredentials = {
  mailAdress: string;
  password: string;
};

type loginResponse = {
  message: string;
  user: User;
};

const login = async (credentials: loginCredentials): Promise<loginResponse> => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/auth/login",
    credentials,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const useLogin = () => {
  const { setUser } = useUsersContext();
  const navigate = useNavigate();
  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser({
        authenticated: true,
        user: data.user,
      });
      navigate("/");
    },
  });

  return {
    loginMutation,
    loginLoading: isPending,
  };
};

export default useLogin;
