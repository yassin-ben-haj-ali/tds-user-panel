import { z } from "zod";

export const addArticleSchema = z.object({
  numero: z.string().min(1, "Numéro est requis"),
  received_qty: z.number().min(1, "Quantité reçue est requise"),
  date_export: z.date().refine(
    (date) => date > new Date(),
    { message: "La date doit être supérieure à aujourd’hui" }
  ),
});

export type FormValues = z.infer<typeof addArticleSchema>;


