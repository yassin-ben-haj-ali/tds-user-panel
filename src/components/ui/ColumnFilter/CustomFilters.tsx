export const customFilters: Record<
  //table
  string,
  {
    filters: {
      //[column]:    (filter value) => response custom filter
      [key: string]: (value: string) => string;
    };
  }
> = {
  users: {
    filters: {
      name: (value) =>
        `where[OR][0][firstName][contains]=${value}&where[OR][0][firstName][mode]=insensitive&where[OR][1][lastName][contains]=${value}&where[OR][1][lastName][mode]=insensitive`,
    },
  },
};

export const customOrders: Record<
  //table
  string,
  {
    filters: {
      //[column]:    (filter value) => response custom filter
      [key: string]: (value: string) => string;
    };
  }
> = {
  users: {
    filters: {
      name: (value) => `orderBy[firstName]=${value}`,
    },
  },
};
