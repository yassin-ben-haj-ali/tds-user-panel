import { z } from "zod";
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

export const addManufacturerSchema = z
  .object({
    firstName: z.string().min(1, "Prénom est requis"),
    lastName: z.string().min(1, "Nom est requis"),
    civility: z.string("Civilité est requis").min(1, "Civilité est requis"),
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
