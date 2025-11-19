import { CustomInput } from "@/components/ui/CustomInput";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { FormValues } from "./AddArticleType";

type Props = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
};

const UserForm = ({ register, errors }: Props) => {
  return (
    <>
      <div className="space-y-3">
        <CustomInput
          required
          label="Numéro d'article"
          placeholder="Numéro d'article"
          error={errors.numero?.message}
          {...register("numero")}
        />
        <CustomInput
          required
          label="Quantité réçu"
          placeholder="Quantité réçu"
          type="number"
          error={errors.received_qty?.message}
          {...register("received_qty")}
        />
      </div>
    </>
  );
};

export default UserForm;
