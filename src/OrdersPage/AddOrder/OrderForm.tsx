import CustomSelect from "@/components/ui/CustomSelect";

const commandeOptions = [
  { label: "commande1", value: "1" },
  { label: "commande2", value: "2" },
];
const fabriquantOptions = [
  { label: "fabriquant1", value: "1" },
];
const technicienOptions = [
  { label: "technicien1", value: "1" },
];

const OrderForm = () => {
  return (
    <>
      <div className="space-y-3">
        <CustomSelect
          options={commandeOptions}
          required
          label="Commande"
          placeholder="Commande"
        />
        <CustomSelect
          options={fabriquantOptions}
          required
          label="Fabriquant"
          placeholder="Fabriquant"
        />
        <CustomSelect
          options={technicienOptions}
          required
          label="Technicien"
          placeholder="Technicien"
        />
      </div>
    </>
  );
};

export default OrderForm;
