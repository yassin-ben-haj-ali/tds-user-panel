import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormValues } from "../AddArticle/AddArticleType";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const createArticle = async (
  credentials: FormValues,
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.post("/article/", credentials);
  return response.data;
};

const useCreateArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: createArticleMutation,
    isPending: createArticleLoading,
  } = useMutation({
    mutationFn: (data: FormValues) => createArticle(data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
  return {
    createArticleMutation,
    createArticleLoading,
  };
};
export default useCreateArticle;
