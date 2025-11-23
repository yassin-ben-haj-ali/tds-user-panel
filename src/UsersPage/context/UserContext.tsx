import { createContext, useState } from "react";
import type { User, UsersContextStateType } from "./types";

export const initialState: UsersContextStateType = {
  tableFilters: {
    users: [],
  },
  auth: {
    authenticated: false,
    user: {} as User,
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
