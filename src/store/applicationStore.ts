import { create } from 'zustand';
import type { Application, LogEntry } from '../types/application';

interface ApplicationStore {
  applications: Application[];
  activityLog: LogEntry[];
  isLoading: boolean;
  error: string | null;

  setApplications: (apps: Application[]) => void;
  updateApplication: (id: string, data: Partial<Application>) => void;
  addLogEntry: (entry: LogEntry) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: [],
  activityLog: [],
  isLoading: false,
  error: null,

  setApplications: (applications) => set({ applications }),

  updateApplication: (id, data) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id ? { ...app, ...data } : app,
      ),
    })),

  addLogEntry: (entry) =>
    set((state) => ({
      activityLog: [...state.activityLog, entry],
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}));
