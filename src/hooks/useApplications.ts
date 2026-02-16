import { useEffect, useCallback } from 'react';
import { useApplicationStore } from '../store/applicationStore';
import { mockApi } from '../lib';

export const useApplications = () => {
  const {
    applications,
    isLoading,
    error,
    setApplications,
    setLoading,
    setError,
  } = useApplicationStore();

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockApi.getApplications();
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  }, [setApplications, setLoading, setError]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return { applications, isLoading, error, refetch: fetchApplications };
};
