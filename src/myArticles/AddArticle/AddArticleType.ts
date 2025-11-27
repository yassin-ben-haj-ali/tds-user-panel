import { z } from "zod";

export const addArticleSchema = z.object({
  number: z.string().min(1, "Numéro est requis"),
  quantity: z.number().min(1, "Quantité reçue est requise"),
  exportedAt: z
    .date()
    .refine((date) => date > new Date(), {
      message: "La date doit être supérieure à aujourd’hui",
    }),
});

export type FormValues = z.infer<typeof addArticleSchema>;
