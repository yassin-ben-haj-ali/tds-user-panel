import { useContext } from "react";
import type { Manufacturer } from "./types";
import { ManufacturersContext } from "./ManufacturerContext";

export const useManufacturersContext = () => {
  const ctx = useContext(ManufacturersContext);
  if (!ctx) {
    throw new Error(
      "useManufacturersContext must be used within a ManufacturersProvider"
    );
  }
  const { setState, manufacturers } = ctx;
  const setManufacturers = (manufacturers: Manufacturer[]) => {
    setState((prev) => ({
      ...prev,
      manufacturers,
    }));
  };

  const setSearchWord = (searchWord: string) => {
    setState((prev) => ({
      ...prev,
      searchWord,
    }));
  };

  return {
    ...manufacturers,
    setManufacturers,
    setSearchWord,
    setState,
  };
};
