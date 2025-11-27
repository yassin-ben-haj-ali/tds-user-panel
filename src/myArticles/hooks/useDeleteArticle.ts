import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";

const deleteArticle = async (axiosPrivate: AxiosInstance, id: string) => {
  const response = await axiosPrivate.delete(`/article/${id}`);
  return response.data;
};

const useDeleteArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteArticleMutation,
    isPending: deleteArticleLoading,
  } = useMutation({
    mutationFn: async (id: string) => deleteArticle(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
  return {
    deleteArticleMutation,
    deleteArticleLoading,
  };
};

export default useDeleteArticle;
