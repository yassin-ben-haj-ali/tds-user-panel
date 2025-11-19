export type Article = {
  id: string;
  numero: string;
  received_qty: number;
  date_export: string;
  status?: string;
};

export type ArticleContextStateType = {
  formStep: number;
};
