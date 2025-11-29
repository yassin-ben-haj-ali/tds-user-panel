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
  orderItems?:OrderItem[]
};

export type OrderItem = {
  id: string;
  quantity: number;
  createdAt: string;
  order: Order;
};

export type OrderContextStateType = {
  orders: Order[];
  orderItems: OrderItem[];
  searchWord: string;
};
