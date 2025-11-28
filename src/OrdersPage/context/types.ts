import type { Manufacturer } from "@/ManufacturersPage/context/types";
import type { Article } from "@/myArticles/context/types";

export type Order = {
  id: string;
  fabriquant: Manufacturer;
  fabriquantId: string;
  article: Article;
  articleId: string;
};

export type OrderContextStateType = {
  orders: Order[];
  searchWord: string;
};
