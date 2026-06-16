export interface Procedure {
  id: string;
  name: string;
  marathiName: string;
  price: number;
  description: string;
  iconName: string;
  duration?: string;
  instructions?: string[];
}

export interface ClinicPolicy {
  id: string;
  title: string;
  description: string;
  iconName: string;
  type: 'info' | 'error' | 'success' | 'warning';
}

export interface ClinicTiming {
  days: string;
  hours: string;
  isClosed?: boolean;
}

export type ViewType = 'home' | 'services' | 'contact' | 'reviews';

export interface Appointment {
  id: string;
  fullName: string;
  phoneNumber: string;
  procedureId: string;
  procedureName: string;
  preferredDate: string;
  preferredTime: string;
  status: 'Pending Approval' | 'Confirmed' | 'Completed';
  createdAt: string;
}
