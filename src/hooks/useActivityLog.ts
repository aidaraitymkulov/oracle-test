import { useApplicationStore } from '../store/applicationStore';
import { generateId, formatCurrency } from '../lib';
import type { Application } from '../types';

export const useActivityLog = () => {
  const { activityLog, addLogEntry } = useApplicationStore();

  const logLimitChange = (name: string, oldLimit: number, newLimit: number) => {
    addLogEntry({
      id: generateId(),
      timestamp: new Date(),
      message: `Для клиента ${name} лимит изменён с ${formatCurrency(oldLimit)} на ${formatCurrency(newLimit)}`,
    });
  };

  const logStatusChange = (name: string, status: Application['status']) => {
    const statusLabels: Record<Application['status'], string> = {
      New: 'Новая',
      Approved: 'Одобрена',
      Rejected: 'Отклонена',
    };
    addLogEntry({
      id: generateId(),
      timestamp: new Date(),
      message: `Статус изменён на «${statusLabels[status]}» для ${name}`,
    });
  };

  return { activityLog, logLimitChange, logStatusChange };
};
