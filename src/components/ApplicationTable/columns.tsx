import { createColumnHelper } from '@tanstack/react-table';
import type { Application } from '../../types';
import { maskAccount, formatCurrency } from '../../lib';

const columnHelper = createColumnHelper<Application>();

const statusStyles: Record<Application['status'], string> = {
  New: 'bg-blue-100 text-blue-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

const statusLabels: Record<Application['status'], string> = {
  New: 'Новая',
  Approved: 'Одобрена',
  Rejected: 'Отклонена',
};

export const columns = [
  columnHelper.accessor('name', {
    header: 'ФИО клиента',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('account', {
    header: 'Счёт',
    cell: (info) => (
      <span className="font-mono text-gray-600">
        {maskAccount(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor('currentLimit', {
    header: 'Текущий лимит',
    cell: (info) => `${formatCurrency(info.getValue())} ₽`,
  }),
  columnHelper.accessor('requestedLimit', {
    header: 'Запрошенный лимит',
    cell: (info) => `${formatCurrency(info.getValue())} ₽`,
  }),
  columnHelper.accessor('status', {
    header: 'Статус',
    cell: (info) => {
      const status = info.getValue();
      return (
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
        >
          {statusLabels[status]}
        </span>
      );
    },
  }),
];
