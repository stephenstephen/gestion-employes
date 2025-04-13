import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
  PaginationState,
} from '@tanstack/react-table';
import { useEmployees } from '@/hooks/useEmployees';
import { Employee } from '@/types/employee';
import { formatDate } from '@/lib/utils';

const columns: ColumnDef<Employee>[] = [
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
    cell: ({ row }) => formatDate(row.original.dateOfBirth),
  },
  {
    accessorKey: 'exitDate',
    header: 'Sortie',
    cell: ({ row }) => formatDate(row.original.dateOfBirth),
  }
];

const EmployeeTable: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });  
  const { data, isLoading } = useEmployees(pagination.pageIndex + 1);

  const table = useReactTable({
    data: data?.items || [],
    columns,
    pageCount: data?.totalPages ?? 1,
    state: {
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p>Chargement en cours...</p>;

  return (
    <div className="p-4">
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-3 py-2 text-left font-semibold">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-t">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-3 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button 
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Précédent
        </button>
        <span>
          Page {pagination.pageIndex + 1} sur {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
