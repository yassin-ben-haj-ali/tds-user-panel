import { z } from "zod";
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

export const addManufacturerSchema = z
  .object({
    name: z.string().min(1, "Nom est requis"),
    adress: z.string().min(1, "adresse est requis"),
    mailAdress: z
      .string()
      .min(1, "Emailest requis")
      .email("L'email n'est pas valide"),
    telephoneNumber: z
      .string("N° téléphone est requis")
      .min(1, "N° téléphone est requis"),
    countryCode: z.string().optional(),
  })
  .refine(
    (data) => {
      return isValidPhoneNumber(
        data.telephoneNumber ?? "",
        data.countryCode as CountryCode
      );
    },
    {
      message: "Le numéro de téléphone n'est pas valide",
      path: ["telephoneNumber"],
    }
  );

export type FormValues = z.infer<typeof addManufacturerSchema>;
