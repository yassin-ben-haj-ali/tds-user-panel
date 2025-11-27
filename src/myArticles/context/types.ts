export type Article = {
  id: string;
  number: string;
  quantity: number;
  exportedAt: string;
  status?: string;
};

export type ArticleContextStateType = {
  formStep: number;
  articles: Article[];
  searchWord: string;
};
