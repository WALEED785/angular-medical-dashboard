export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPersonalId: string;
  appointmentType: AppointmentType;
  startTime: Date;
  endTime?: Date;
  status: AppointmentStatus;
  notes?: string;
  doctorName: string;
}

export enum AppointmentType {
  EMERGENCY = 'Emergency Consultation',
  CONSULTATION = 'Routine Checkup',
  FOLLOW_UP = 'Follow-up Call',
  PHONE_CALL = 'In-Person Visit'
}

export enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  NO_SHOW = 'No Show'
}

export interface AppointmentAction {
  type: 'call' | 'visit' | 'notes';
  label: string;
  color: 'primary' | 'accent' | 'warn';
}
