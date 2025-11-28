import { useContext } from "react";
import type { authState, TableFilter, TableFilters, User } from "./types";
import { initialState, UsersContext } from "./UserContext";

export const useUsersContext = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  const { setState, users } = ctx;
  const setTableFilters = (table: keyof TableFilters, filters: TableFilter[]) =>
    setState((prev) => ({
      ...prev,
      tableFilters: {
        ...prev.tableFilters,
        [table]: filters,
      },
    }));
  const resetState = () =>
    setState((prev) => ({
      ...prev,
      ...initialState.tableFilters,
    }));

  const setUser = (auth: authState | null) =>
    setState((prev) => ({
      ...prev,
      auth,
    }));

  const setUsers = (users: User[]) => {
    setState((prev) => ({
      ...prev,
      userList: users,
    }));
  };

  const setSearchWord = (searchWord: string) => {
    setState((prev) => ({
      ...prev,
      searchWord,
    }));
  };

  return {
    ...users,
    setTableFilters,
    resetState,
    setUser,
    setUsers,
    setSearchWord,
    setState,
  };
};
