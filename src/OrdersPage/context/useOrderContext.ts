import { useContext } from "react";
import type { Order } from "./types";
import { OrdersContext } from "./OrdersContext";

export const useOrdersContext = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error("useOrdersContext must be used within a OrdersProvider");
  }
  const { setState, orders } = ctx;

  const setOrders = (orders: Order[]) => {
    setState((prev) => ({
      ...prev,
      orders,
    }));
  };

  const setSearchWord = (searchWord: string) => {
    setState((prev) => ({
      ...prev,
      searchWord,
    }));
  };

  return {
    ...orders,
    setOrders,
    setSearchWord,
    setState,
  };
};
