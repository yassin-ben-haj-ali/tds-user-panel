import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

type EditArticle = {
  number?: string;
  quantity?: number;
  exportedAt?: Date;
};

const editArticle = async (
  credentials: EditArticle,
  id: string,
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.patch(`/article/${id}`, credentials);
  return response.data;
};

const useEditArticle = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutateAsync: editArticleMutation, isPending: editArticleLoading } =
    useMutation({
      mutationFn: ({ data, id }: { data: EditArticle; id: string }) =>
        editArticle(data, id, axiosPrivate),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["articles"],
        });
      },
    });
  return {
    editArticleMutation,
    editArticleLoading,
  };
};
export default useEditArticle;
