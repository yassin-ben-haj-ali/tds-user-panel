import { useContext } from "react";
import { ArticlesContext } from "./ArticleContext";

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

  return {
    ...articles,
    setFormStep,
    setState,
  };
};
