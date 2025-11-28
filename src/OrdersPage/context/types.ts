import type { Manufacturer } from "@/ManufacturersPage/context/types";
import type { Article } from "@/myArticles/context/types";
import type { User } from "@/UsersPage/context/types";

export type Order = {
  id: string;
  fabriquant?: Manufacturer;
  fabriquantId: string;
  article?: Article;
  articleId: string;
  technicien?: User;
  technicienId: string;
};

export type OrderContextStateType = {
  orders: Order[];
  searchWord: string;
};
