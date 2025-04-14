import { User } from '@/types/auth';
import { ColumnDef } from '@tanstack/react-table';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'username',
    header: 'Nom d’utilisateur',
    cell: ({ row }) => <span className="text-gray-800">{ row.original.username }</span>,
  },
];
