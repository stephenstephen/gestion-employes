import React, { useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { useEmployees } from '@/hooks/useEmployees';
import { DataTable } from '@/components/table/DataTable';
import { EmployeeColumns } from '@/pages/employee/EmployeeColumns';
import { ErrorState, LoadingState } from '@/components/common/States';
import { BackToDashboardButton } from '@/components/common/BackToDashboardButton';
import { TableActionsProvider } from '@/context/TableActionContext';
import { Employee } from '@/types/employee';
import { deleteEmployee, createEmployee, updateEmployee } from '@/services/employee.service';
import { useAlert } from '@/hooks/useAlert';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { EmployeeFormDialog } from '@/pages/employee/EmployeeFormDialog';

const EmployeeList: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const queryClient = useQueryClient();
  const { data, isLoading, error } = useEmployees(pagination.pageIndex);
  const { showSuccess, showError } = useAlert();

  const handleCreate = async (data: any) => {
    try {
      await createEmployee(data);
      showSuccess('Employé ajouté', `${data.firstName} ${data.lastName} a bien été ajouté.`);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    } catch (err) {
      showError('Erreur', 'Impossible d\'ajouter l\'employé.');
      throw err;
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      await updateEmployee(data.id, data);
      showSuccess('Employé modifié', `${data.firstName} ${data.lastName} a bien été modifié.`);
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    } catch (err) {
      showError('Erreur', 'Impossible de modifier l\'employé.');
      throw err;
    }
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Liste des employés</h1>
        <div className="flex gap-2">
          <EmployeeFormDialog
            trigger={<Button variant="blue">Ajouter un employé</Button>}
            onSubmit={handleCreate}
          />
          <BackToDashboardButton />
        </div>
      </div>

      <TableActionsProvider<Employee>
        actions={{
          onEdit: handleUpdate,
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
