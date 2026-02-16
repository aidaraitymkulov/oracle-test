import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Select, Input } from '../ui';

interface TableFiltersProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
  onSearchChange: (search: string) => void;
}

const statusOptions = [
  { value: 'all', label: 'Все статусы' },
  { value: 'New', label: 'Новые' },
  { value: 'Approved', label: 'Одобренные' },
  { value: 'Rejected', label: 'Отклонённые' },
];

export const TableFilters = ({
  statusFilter,
  onStatusChange,
  onSearchChange,
}: TableFiltersProps) => {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    onSearchChange(value);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="flex items-end gap-4">
      <div className="w-48">
        <Select
          value={statusFilter}
          onValueChange={onStatusChange}
          options={statusOptions}
          label="Статус"
        />
      </div>
      <div className="w-72">
        <Input
          id="search"
          label="Поиск по ФИО"
          placeholder="Введите имя..."
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};
