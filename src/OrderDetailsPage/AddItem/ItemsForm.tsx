import { CustomInput } from "@/components/ui/CustomInput";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { today, getLocalTimeZone } from "@internationalized/date";

type ItemsFormProps = {
  setQuantity: (quantity: number | null) => void;
  quantity: number | null;
};

const ItemsForm: React.FC<ItemsFormProps> = ({ setQuantity, quantity }) => {
  return (
    <>
      <div className="space-y-3">
        <CustomInput
          required
          label="Quantité"
          placeholder="Quantité"
          type="number"
          error={!quantity ? "quantity is required" : undefined}
          value={quantity ?? 0}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <CustomDatePicker
          id="date"
          label="date de création"
          className="pointer-events-auto flex w-full items-center justify-center rounded-md border border-[#E6E6E6] bg-[#FAFAFA] text-[#4c4c4c] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          required={true}
          defaultValue={today(getLocalTimeZone())}
          disabled
        />
      </div>
    </>
  );
};

export default ItemsForm;
