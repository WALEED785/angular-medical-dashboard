export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  personalId: string;
  phone?: string;
  email?: string;
  address?: Address;
  emergencyContact?: EmergencyContact;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface PatientSearchResult {
  id: string;
  name: string;
  personalId: string;
  phone?: string;
}