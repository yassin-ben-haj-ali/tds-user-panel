import { createContext, useState } from "react";
import type { OrderContextStateType } from "./types";

export const initialState: OrderContextStateType = {
  orders: [],
  searchWord: "",
  orderItems: [],
};

type OrdersContextType = {
  orders: typeof initialState;
  setState: React.Dispatch<React.SetStateAction<typeof initialState>>;
};

export const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setState] = useState(initialState);

  return (
    <OrdersContext.Provider value={{ orders, setState }}>
      {children}
    </OrdersContext.Provider>
  );
};
