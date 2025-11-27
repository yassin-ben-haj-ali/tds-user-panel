export type Manufacturer = {
  id: string;
  name: string;
  adress: string;
  mailAdress: string;
  telephoneNumber: string;
  countryCode?: string;
  createdAt: string;
};

export type ManufacturerContextStateType = {
  manufacturers: Manufacturer[];
  searchWord: string;
};
