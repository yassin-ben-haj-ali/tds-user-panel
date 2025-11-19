import { memo, useCallback, useMemo } from "react";
import useInitialOptions from "./hooks/useInitialOptions";
import { useFilterOptions } from "./hooks/useFilterOptions";
import SearchInput from "./SearchInput";
import OptionsList from "./OptionList";
import type { FilterType } from "./types";

type ColumnOptionsProps = {
  optionName: string;
  filterType: FilterType;
  defaultKeyword: string;
  setKeyword: (keyword: string) => void;
  selectedRadio: string;
  onSelectRadio: (option: string) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
};

const ColumnOptions = memo((props: ColumnOptionsProps) => {
  const {
    filterType,
    optionName,
    selectedRadio,
    onSelectRadio,
    setKeyword,
    defaultKeyword,
    onKeyDown,
  } = props;
  const { initialOptions } = useInitialOptions(filterType, optionName);
  const { filteredOptions, handleSearch, clearSearch } =
    useFilterOptions(initialOptions);

  const handleKeywordChange = useCallback(
    (value: string) => {
      handleSearch(value);
      setKeyword(value);
    },
    [handleSearch, setKeyword]
  );

  const handleClearSearch = useCallback(() => {
    clearSearch();
    setKeyword("");
  }, [clearSearch, setKeyword]);

  const showSearchBar = useMemo(
    () => initialOptions.length === 0,
    [initialOptions.length]
  );
  const isReferentColumn = optionName === "referentName";

  return (
    <div className="space-y-3" onKeyDown={onKeyDown}>
      <span className="block font-semibold">Filtrer par valeur</span>
      {(showSearchBar || isReferentColumn) && (
        <SearchInput
          value={defaultKeyword}
          onChange={handleKeywordChange}
          onClear={handleClearSearch}
        />
      )}
      <OptionsList
        options={filteredOptions}
        selectedValue={selectedRadio}
        onSelect={onSelectRadio}
        onReachBottom={() => {}}
      />
    </div>
  );
});

ColumnOptions.displayName = "ColumnOptions";

export default ColumnOptions;
