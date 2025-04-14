import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useTableActions } from "@/context/TableActionContext";
import { formatDate } from "@/lib/utils";
import { EmployeeFormDialog } from "@/pages/employee/EmployeeFormDialog";
import { Employee } from "@/types/employee";
import { ColumnDef } from "@tanstack/react-table";

export const EmployeeColumns: ColumnDef<Employee>[] = [
  { accessorKey: 'firstName', header: 'Prénom' },
  { accessorKey: 'lastName', header: 'Nom' },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date de naissance',
    cell: ({ row }) => formatDate(row.original.dateOfBirth),
  },
  {
    accessorKey: 'entryDate',
    header: 'Entrée',
    cell: ({ row }) => formatDate(row.original.entryDate),
  },
  {
    accessorKey: 'exitDate',
    header: 'Sortie',
    cell: ({ row }) => formatDate(row.original.exitDate),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {

      const { onEdit, onDelete } = useTableActions<Employee>();

      return (
        <div className="flex gap-2">

          <EmployeeFormDialog
            trigger={<Button variant="blue" size="sm">Modifier</Button>}
            initialData={row.original}
            onSubmit={(data) => onEdit?.({ ...row.original, ...data })}
            title="Modifier un employé"
          />

          <ConfirmDialog
            onConfirm={() => onDelete?.(row.original)}
            title="Supprimer l'employé"
            description={`Êtes-vous sûr de vouloir supprimer ${row.original.firstName} ${row.original.lastName} ?`}
            confirmLabel="Supprimer"
            confirmVariant="bg-red-600 hover:bg-red-700"
            trigger={
              <Button variant="destructive" size="sm">
                Supprimer
              </Button>
            }
          />
        </div>
      )
    },
  }
];