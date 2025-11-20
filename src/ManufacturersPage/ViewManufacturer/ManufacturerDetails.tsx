import { CustomInput } from "@/components/ui/CustomInput";
import CustomSelect from "@/components/ui/CustomSelect";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { User } from "@/UsersPage/context/types";

type Props = {
  manufacturer: Omit<User, "role"> | undefined;
};
const civilityOptions = [
  { label: "Monsieur", value: "Mr" },
  { label: "Madame", value: "Mme" },
];
const ManufacturerDetails = ({ manufacturer }: Props) => {
  return (
    <>
      <div className="flex items-center gap-3 space-y-4">
        <CustomInput label="Nom" value={manufacturer?.lastName} disabled />
        <CustomInput label="Prénom" value={manufacturer?.firstName} disabled />
      </div>
      <CustomInput
        label="Email"
        placeholder="Email"
        required
        value={manufacturer?.mailAdress}
        disabled={true}
      />
      <CustomSelect
        label="Civilité"
        placeholder="Civilité"
        required={true}
        options={civilityOptions}
        value={manufacturer?.civility}
        disabled={true}
      />

      <div className="flex w-full items-center space-x-3 space-y-4">
        <div className="w-full">
          <PhoneInput
            label="N° téléphone"
            placeholder="N° téléphone"
            value={manufacturer?.telephoneNumber}
            defaultCountry="FR"
            disabled={true}
          />
        </div>
      </div>
    </>
  );
};

export default ManufacturerDetails;
