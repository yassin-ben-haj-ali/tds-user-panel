import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { FormValues } from "../AddArticle/AddArticleType";


const createArticle = async (credentials: FormValues) => {
  const response = await axios.post(
    "/article/",
    credentials
  );
  return response.data;
};

const useCreateArticle = () => {
  const { mutateAsync: createArticleMutation } = useMutation({
    mutationFn: createArticle,
  });
  return {
    createArticleMutation,
  };
};
export default useCreateArticle;
