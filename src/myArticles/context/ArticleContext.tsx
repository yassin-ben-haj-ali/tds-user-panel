import { createContext, useState } from "react";
import type { ArticleContextStateType } from "./types";

export const initialState: ArticleContextStateType = {
  formStep: 1,
};

type ArticlesContextType = {
  articles: typeof initialState;
  setState: React.Dispatch<React.SetStateAction<typeof initialState>>;
};

export const ArticlesContext = createContext<ArticlesContextType | null>(null);

export const ArticlesProvider = ({ children }: { children: React.ReactNode }) => {
  const [articles, setState] = useState(initialState);

  return (
    <ArticlesContext.Provider value={{ articles, setState }}>
      {children}
    </ArticlesContext.Provider>
  );
};
