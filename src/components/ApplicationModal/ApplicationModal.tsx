import { useState } from 'react';
import { Modal } from '../ui';
import { ApplicationForm } from './ApplicationForm';
import { ActivityLog } from './ActivityLog';
import { mockApi } from '../../lib';
import type { Application } from '../../types';
import type { ApplicationFormData } from '../../lib';
import { useApplicationStore } from '../../store/applicationStore';
import { useActivityLog } from '../../hooks/useActivityLog';

interface ApplicationModalProps {
  application: Application | null;
  onClose: () => void;
}

export const ApplicationModal = ({
  application,
  onClose,
}: ApplicationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const updateApplication = useApplicationStore(
    (state) => state.updateApplication,
  );
  const { activityLog, logLimitChange, logStatusChange } = useActivityLog();

  const handleSubmit = async (data: ApplicationFormData) => {
    if (!application) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await mockApi.updateApplication(application.id, {
        requestedLimit: data.newLimit,
        status: data.status,
      });

      updateApplication(application.id, {
        requestedLimit: data.newLimit,
        status: data.status,
      });

      if (data.newLimit !== application.requestedLimit) {
        logLimitChange(
          application.name,
          application.requestedLimit,
          data.newLimit,
        );
      }

      if (data.status !== application.status) {
        logStatusChange(application.name, data.status);
      }

      onClose();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Ошибка сохранения');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={!!application}
      onOpenChange={(open) => !open && onClose()}
      title={application?.name ?? ''}
    >
      {application && (
        <>
          {submitError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {submitError}
            </div>
          )}
          <ApplicationForm
            application={application}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
          <ActivityLog entries={activityLog} />
        </>
      )}
    </Modal>
  );
};
