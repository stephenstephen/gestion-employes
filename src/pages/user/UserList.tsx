
import { ErrorState, LoadingState } from '@/components/common/States';
import { useUsers } from '@/hooks/useUsers';
import { userColumns } from '@/pages/user/Usercolumns';
import { DataTable } from '@/components/table/DataTable';
import { BackToDashboardButton } from '@/components/common/BackToDashboardButton';

export default function UserList() {

  const { data = [], isLoading, error } = useUsers();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-4">Liste des utilisateurs</h1>
        <BackToDashboardButton />
      </div>   
      <DataTable
        columns={userColumns}
        data={data} 
        globalFilterPlaceholder="Rechercher un utilisateur..." 
      />
    </div>
  );
}
