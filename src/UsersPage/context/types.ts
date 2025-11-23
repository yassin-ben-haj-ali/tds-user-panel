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

export type authState = {
  authenticated: boolean;
  user: User;
};

export type UsersContextStateType = {
  tableFilters: TableFilters;
  auth: authState;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  mailAdress: string;
  role: string;
  telephoneNumber: string;
};
