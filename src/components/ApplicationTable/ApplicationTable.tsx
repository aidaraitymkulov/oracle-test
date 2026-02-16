import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { Application } from '../../types';
import { columns } from './columns';
import { TableFilters } from './TableFilters';

interface ApplicationTableProps {
  applications: Application[];
  isLoading: boolean;
  onRowClick: (application: Application) => void;
}

export const ApplicationTable = ({
  applications,
  isLoading,
  onRowClick,
}: ApplicationTableProps) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    let result = applications;

    if (statusFilter !== 'all') {
      result = result.filter((app) => app.status === statusFilter);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((app) => app.name.toLowerCase().includes(query));
    }

    return result;
  }, [applications, statusFilter, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <TableFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onSearchChange={setSearch}
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  Заявки не найдены
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick(row.original)}
                  className="cursor-pointer transition-colors hover:bg-blue-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-gray-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TableSkeleton = () => (
  <div className="space-y-4">
    <div className="flex gap-4">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
      <div className="h-10 w-72 animate-pulse rounded-lg bg-gray-200" />
    </div>
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-4 border-b border-gray-100 px-4 py-4">
          <div className="h-4 flex-1 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  </div>
);
