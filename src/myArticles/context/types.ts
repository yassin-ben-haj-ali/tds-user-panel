import type { Order } from "@/OrdersPage/context/types";

export type Article = {
  id: string;
  number: string;
  quantity: number;
  exportedAt: string;
  status?: string;
  order?: Order[];
};

export type ArticleContextStateType = {
  formStep: number;
  articles: Article[];
  searchWord: string;
};
