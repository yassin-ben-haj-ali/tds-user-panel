export type TableFilters = {
  users: TableFilter[];
  articles: TableFilter[];
  manufacturers: TableFilter[];
};

export type TableFilter = {
  optionName: string;
  filterKey: string;
  filterValue: string;
  customFilter?: string;
  customOrder?: string;
};

export type authState = {
  AccessToken: string;
  user: User;
};

export type UsersContextStateType = {
  tableFilters: TableFilters;
  auth: authState | null;
  userList: User[];
  searchWord: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  mailAdress: string;
  role: string;
  telephoneNumber: string;
  countryCode: string;
  createdAt: string;
};
