import { createContext, useState } from "react";
import type { UsersContextStateType } from "./types";

const initialState: UsersContextStateType = {
  tableFilters: {
    users: [],
  },
};

type UsersContextType = {
  users: typeof initialState;
  setState: React.Dispatch<React.SetStateAction<typeof initialState>>;
};

export const UsersContext = createContext<UsersContextType | null>(null);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setState] = useState(initialState);

  return (
    <UsersContext.Provider value={{ users, setState }}>
      {children}
    </UsersContext.Provider>
  );
};
