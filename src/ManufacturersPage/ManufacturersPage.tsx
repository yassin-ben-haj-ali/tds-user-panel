import ManufacturersPageLayout from "./ManufacturersPageLayout";
import ManufacturersTable from "./ManufacturersList/ManufacturersList";

const ManufacturersPage = () => {
  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <ManufacturersPageLayout>
        <ManufacturersTable />
      </ManufacturersPageLayout>
    </div>
  );
};

export default ManufacturersPage;
