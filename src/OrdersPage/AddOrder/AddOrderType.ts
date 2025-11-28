import { z } from "zod";

export const addOrderSchema = z.object({
  articleId: z.string().min(1, "article est requis"),
  technicienId: z.string().min(1, "technicien est requise"),
  fabriquantId: z.string().min(1, "fabriquant est requise"),
});

export type FormValues = z.infer<typeof addOrderSchema>;
