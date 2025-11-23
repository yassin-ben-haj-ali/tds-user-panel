import z from "zod";

export const loginSchema = z.object({
  mailAdress: z.string().min(1, "email is required").email("invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type FormValues = z.infer<typeof loginSchema>;
