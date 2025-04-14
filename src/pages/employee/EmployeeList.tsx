import React, { useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { useEmployees } from '@/hooks/useEmployees';
import { DataTable } from '@/components/table/DataTable';
import { EmployeeColumns } from '@/pages/employee/EmployeeColumns';
import { ErrorState, LoadingState } from '@/components/common/States';
import { BackToDashboardButton } from '@/components/common/BackToDashboardButton';
import { TableActionsProvider } from '@/context/TableActionContext';
import { Employee } from '@/types/employee';
import { deleteEmployee } from '@/services/employee.service';
import { useAlert } from '@/hooks/useAlert';
import { useQueryClient } from '@tanstack/react-query';


const EmployeeList: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useEmployees(pagination.pageIndex);
  const { showSuccess, showError } = useAlert();

  const handleEdit = (employee: Employee) => {
    console.log('Éditer:', employee);
  };

  const handleDelete = async (employee: Employee) => {
    try {
      await deleteEmployee(employee.id);
      showSuccess('Employé supprimé', `${employee.firstName} ${employee.lastName} a bien été supprimé.`);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    } catch (err) {
      showError('Erreur', 'Impossible de supprimer cet employé.');
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;


  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-4">Liste des employés</h1>
        <BackToDashboardButton />
      </div>

      <TableActionsProvider<Employee>
        actions={{
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      >

        <DataTable
          data={data?.items || []}
          columns={EmployeeColumns}
          pagination={pagination}
          onPaginationChange={setPagination}
          pageCount={data?.totalPages ?? 1}
          globalFilterPlaceholder="Rechercher un employé..."
        />

      </TableActionsProvider>
    </div>
  );
};

export default EmployeeList;
