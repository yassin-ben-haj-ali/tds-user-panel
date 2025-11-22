import { CustomInput } from "@/components/ui/CustomInput";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { Manufacturer } from "./ViewManufacturer";

type Props = {
  manufacturer: Manufacturer | undefined;
};

const ManufacturerDetails = ({ manufacturer }: Props) => {
  return (
    <div className="space-y-3">
      <CustomInput label="Nom" value={manufacturer?.name} disabled />
      <CustomInput
        label="Email"
        placeholder="Email"
        required
        value={manufacturer?.mailAdress}
        disabled={true}
      />
      <CustomInput label="adress" value={manufacturer?.adress} disabled />
      <PhoneInput
        label="N° téléphone"
        placeholder="N° téléphone"
        value={manufacturer?.telephoneNumber}
        defaultCountry="FR"
        disabled={true}
      />
    </div>
  );
};

export default ManufacturerDetails;
