import type { LogEntry } from '../../types';

interface ActivityLogProps {
  entries: LogEntry[];
}

export const ActivityLog = ({ entries }: ActivityLogProps) => {
  if (entries.length === 0) return null;

  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <h3 className="text-sm font-semibold text-gray-700">Лог активности</h3>
      <ul className="mt-2 space-y-2">
        {entries.map((entry) => (
          <li key={entry.id} className="text-sm text-gray-600">
            <span className="text-xs text-gray-400">
              {entry.timestamp.toLocaleTimeString('ru-RU')}
            </span>{' '}
            {entry.message}
          </li>
        ))}
      </ul>
    </div>
  );
};
