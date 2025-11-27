import { createContext, useState } from "react";
import type {ManufacturerContextStateType } from "./types";

export const initialState: ManufacturerContextStateType = {
  manufacturers: [],
  searchWord: "",
};

type ManufacturersContextType = {
  manufacturers: typeof initialState;
  setState: React.Dispatch<React.SetStateAction<typeof initialState>>;
};

export const ManufacturersContext = createContext<ManufacturersContextType | null>(null);

export const ManufacturersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [manufacturers, setState] = useState(initialState);

  return (
    <ManufacturersContext.Provider value={{ manufacturers, setState }}>
      {children}
    </ManufacturersContext.Provider>
  );
};
