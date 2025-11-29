import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ToastMessage from "@/ToastMessage";
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
      ToastMessage({ type: "success", message: "commande supprimé !" });
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
    onError: () => {
      ToastMessage({
        type: "error",
        message: "Erreur lors de la suppression de commande.",
      });
    },
  });
  return {
    deleteArticleMutation,
    deleteArticleLoading,
  };
};

export default useDeleteArticle;
