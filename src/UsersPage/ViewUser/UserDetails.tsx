import { CustomInput } from "@/components/ui/CustomInput";
import CustomSelect from "@/components/ui/CustomSelect";
import { PhoneInput } from "@/components/ui/PhoneInput";
import type { User } from "../context/types";

type Props = {
  user: User | undefined;
};
const roles = [
  { label: "Gestionnaire", value: "Gestionnaire" },
  { label: "Technicien", value: "Technicien" },
  { label: "Administrateur", value: "Administrateur" },
];
const UserDetails = ({ user }: Props) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 space-y-4">
        <CustomInput label="Nom" value={user?.lastName} disabled />
        <CustomInput value={user?.firstName} disabled />
      </div>
      <CustomSelect options={roles} value={user?.role} label="Rôle" disabled />
      <CustomInput
        label="Email"
        placeholder="Email"
        required
        value={user?.mailAdress}
        disabled={true}
      />

      <div className="flex w-full items-center space-x-3 space-y-4">
        <div className="w-full">
          <PhoneInput
            label="N° téléphone"
            placeholder="N° téléphone"
            value={user?.telephoneNumber}
            defaultCountry="FR"
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
