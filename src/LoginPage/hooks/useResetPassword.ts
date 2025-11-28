import axios from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type ResetPasswordCredentials = {
  token: string;
  password: string;
};

type resetPasswordResponse = {
  message: string;
};

const resetPassword = async (
  credentials: ResetPasswordCredentials
): Promise<resetPasswordResponse> => {
  const response = await axios.post("/auth/reset-password", credentials);
  return response.data;
};

const useResetPassword = () => {
  const navigate = useNavigate();
  const { mutateAsync: resetPasswordMutation, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/login");
    },
  });

  return {
    resetPasswordMutation,
    resetPasswordLoading: isPending,
  };
};

export default useResetPassword;
