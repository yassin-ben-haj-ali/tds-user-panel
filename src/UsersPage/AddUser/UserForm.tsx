import { CustomInput } from "@/components/ui/CustomInput";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import CustomSelect from "@/components/ui/CustomSelect";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { FormValues } from "./AddUserType";

type Props = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
};
const civilityOptions = [
  { label: "Monsieur", value: "Mr" },
  { label: "Madame", value: "Mme" },
];

const roles = [
  { label: "Gestionnaire", value: "Gestionnaire" },
  { label: "Technicien", value: "Technicien" },
];

const UserForm = ({ register, errors, setValue, watch }: Props) => {
  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <CustomInput
            required
            label="Nom"
            placeholder="Nom"
            error={errors?.lastName?.message}
            {...register(`lastName`)}
          />
          <CustomInput
            required
            label="Prénom"
            placeholder="Prénom"
            error={errors?.firstName?.message}
            {...register(`firstName`)}
          />
        </div>
        <CustomSelect
          options={roles}
          setValue={(role) => {
            setValue(`role`, role);
          }}
          value={watch(`role`)}
          label="rôle"
          placeholder="rôle"
          required
          error={errors?.role?.message}
        />
        <CustomInput
          required
          error={errors?.mailAdress?.message}
          label="Email"
          type="email"
          {...register(`mailAdress`)}
          placeholder="Email"
        />
        <CustomSelect
          options={civilityOptions}
          required
          label="Civilité"
          placeholder="Civilité"
          value={watch(`civility`)}
          setValue={(civility) => setValue(`civility`, civility)}
          error={errors?.civility?.message}
        />
        <div className="z-50 w-full">
          <PhoneInput
            label="N° téléphone"
            placeholder="N° téléphone"
            required
            value={watch(`telephoneNumber`)}
            defaultCountry="FR"
            onChange={(phoneNumber) => {
              setValue(`telephoneNumber`, phoneNumber);
            }}
            onCountryChange={(country) => {
              setValue("countryCode", country ?? "FR");
            }}
            error={errors?.telephoneNumber?.message}
          />
        </div>
      </div>
    </>
  );
};

export default UserForm;
