import UsersPageLayout from "./UsersPageLayout";
import UsersTable from "./usersList/UsersTable";

const UsersPage = () => {
  return (
    <div className="flex h-full flex-col overflow-y-hidden">
      <div
        className="h-full w-full"
        style={{
          minHeight: "calc(100vh - 300px)",
          overflowY: "auto",
        }}
      >
        <UsersPageLayout>
          <UsersTable />
        </UsersPageLayout>
      </div>
    </div>
  );
};

export default UsersPage;
