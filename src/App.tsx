import { useState } from 'react';
import { ApplicationTable } from './components/ApplicationTable';
import { ApplicationModal } from './components/ApplicationModal';
import { useApplications } from './hooks';
import { Button } from './components/ui';
import type { Application } from './types';

const App = () => {
  const { applications, isLoading, error, refetch } = useApplications();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const handleRowClick = (application: Application) => {
    setSelectedApp(application);
  };

  const handleModalClose = () => {
    setSelectedApp(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900">
          Управление кредитными лимитами
        </h1>

        {error && (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>
            <Button variant="secondary" onClick={refetch}>
              Повторить
            </Button>
          </div>
        )}

        <div className="mt-6">
          <ApplicationTable
            applications={applications}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </div>

        <ApplicationModal
          application={selectedApp}
          onClose={handleModalClose}
        />
      </div>
    </div>
  );
};

export default App;
