export type TableFilters = {
  users: TableFilter[];
};

export type TableFilter = {
  optionName: string;
  filterKey: string;
  filterValue: string;
  customFilter?: string;
  customOrder?: string;
};

export type UsersContextStateType = {
  tableFilters: TableFilters;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  mailAdress: string;
  civility: string;
  role: string;
  telephoneNumber: string;
};
