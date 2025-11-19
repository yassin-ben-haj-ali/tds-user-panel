import { useMemo } from "react";
import { FILTER_OPTIONS } from "@/lib/Constants";
import type { FilterOption, FilterType } from "../types";

type UseInitialOptionsResult = {
  initialOptions: FilterOption[];
};

const useInitialOptions = (
  filterType: FilterType,
  optionName: string
): UseInitialOptionsResult => {
  const initialOptions = useMemo<FilterOption[]>(() => {
    return FILTER_OPTIONS[filterType]?.[optionName] || [];
  }, [filterType, optionName]);

  return { initialOptions };
};

export default useInitialOptions;
