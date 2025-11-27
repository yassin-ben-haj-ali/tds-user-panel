import { useContext } from "react";
import { ArticlesContext } from "./ArticleContext";
import type { Article } from "./types";

export const useArticlesContext = () => {
  const ctx = useContext(ArticlesContext);
  if (!ctx) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  const { setState, articles } = ctx;
  const setFormStep = (formStep: number) => {
    setState((prev) => ({
      ...prev,
      formStep,
    }));
  };

  const setArticles = (articles: Article[]) => {
    setState((prev) => ({
      ...prev,
      articles,
    }));
  };

  const setSearchWord = (searchWord: string) => {
    setState((prev) => ({
      ...prev,
      searchWord,
    }));
  };

  return {
    ...articles,
    setFormStep,
    setArticles,
    setSearchWord,
    setState,
  };
};
