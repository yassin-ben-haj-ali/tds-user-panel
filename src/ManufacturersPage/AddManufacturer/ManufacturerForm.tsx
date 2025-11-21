import { CustomInput } from "@/components/ui/CustomInput";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { FormValues } from "./AddManufacturerType";

type Props = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
};

const ManufacturerForm = ({ register, errors, setValue, watch }: Props) => {
  return (
    <>
      <div className="space-y-3">
        <CustomInput
          required
          label="Nom"
          placeholder="Nom"
          error={errors?.name?.message}
          {...register(`name`)}
        />
        <CustomInput
          required
          error={errors?.mailAdress?.message}
          label="Email"
          type="email"
          {...register(`mailAdress`)}
          placeholder="Email"
        />
        <CustomInput
          required
          label="adress"
          placeholder="adresse"
          error={errors?.adress?.message}
          {...register(`adress`)}
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

export default ManufacturerForm;
