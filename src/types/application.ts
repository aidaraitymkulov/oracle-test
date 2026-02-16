export type ApplicationStatus = 'New' | 'Approved' | 'Rejected';

export interface Application {
  id: string;
  name: string;
  account: string;
  currentLimit: number;
  requestedLimit: number;
  currency: string;
  status: ApplicationStatus;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  message: string;
}
