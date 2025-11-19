import UsersPageLayout from "./UsersPageLayout";
import UsersTable from "./usersList/UsersTable";

const UsersPage = () => {
  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <UsersPageLayout>
        <UsersTable />
      </UsersPageLayout>
    </div>
  );
};

export default UsersPage;
