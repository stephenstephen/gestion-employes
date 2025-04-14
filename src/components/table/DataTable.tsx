import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  PaginationState,
  OnChangeFn,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/table/TablePagination';

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  globalFilterPlaceholder?: string;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

export function DataTable<TData>({
  columns,
  data,
  globalFilterPlaceholder = 'Rechercher...',
  pageCount,
  pagination,
  onPaginationChange,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [localPagination, setLocalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const isManualPagination = !!pagination && !!onPaginationChange;
  const activePagination = isManualPagination ? pagination : localPagination;
  const setActivePagination = isManualPagination ? onPaginationChange : setLocalPagination;

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      pagination: activePagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setActivePagination,
    manualPagination: isManualPagination,
    pageCount: isManualPagination ? pageCount : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder={globalFilterPlaceholder}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full bg-white">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="text-left px-4 py-2 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' ? ' 🔼' : ''}
                    {header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination table={table} />
    </div>
  );
}
