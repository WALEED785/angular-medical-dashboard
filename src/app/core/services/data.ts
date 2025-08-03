import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Appointment, AppointmentType } from '../models/appointment.model';
import { Patient, PatientSearchResult } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private mockAppointments: Appointment[] = [
    {
      id: '1',
      patientId: '420101-1111',
      patientName: 'Ahmed Khan',
      patientPersonalId: '420101-1111',
      appointmentType: AppointmentType.EMERGENCY,
      startTime: new Date(2024, 9, 29, 9, 0),
      status: 'scheduled' as any,
      notes: 'ڈاکٹر صاحب، مجھے سینے میں درد ہو رہا ہے، براہ کرم فوری چیک کریں۔',
      doctorName: 'Dr. Farooq'
    },
    {
      id: '2',
      patientId: '420202-2222',
      patientName: 'Fatima Bano',
      patientPersonalId: '420202-2222',
      appointmentType: AppointmentType.CONSULTATION,
      startTime: new Date(2024, 9, 29, 9, 45),
      status: 'scheduled' as any,
      doctorName: 'Dr. Farooq'
    },
    {
      id: '3',
      patientId: '420303-3333',
      patientName: 'Usman Ali',
      patientPersonalId: '420303-3333',
      appointmentType: AppointmentType.PHONE_CALL,
      startTime: new Date(2024, 9, 29, 10, 30),
      status: 'scheduled' as any,
      doctorName: 'Dr. Farooq'
    },
    {
      id: '4',
      patientId: '420404-4444',
      patientName: 'Hina Shahid',
      patientPersonalId: '420404-4444',
      appointmentType: AppointmentType.FOLLOW_UP,
      startTime: new Date(2024, 9, 29, 11, 15),
      status: 'scheduled' as any,
      doctorName: 'Dr. Farooq'
    },
    {
      id: '5',
      patientId: '420505-5555',
      patientName: 'Imran Qureshi',
      patientPersonalId: '420505-5555',
      appointmentType: AppointmentType.CONSULTATION,
      startTime: new Date(2024, 9, 29, 13, 0),
      status: 'scheduled' as any,
      doctorName: 'Dr. Farooq'
    },
    {
      id: '6',
      patientId: '420606-6666',
      patientName: 'Nida Javed',
      patientPersonalId: '420606-6666',
      appointmentType: AppointmentType.EMERGENCY,
      startTime: new Date(2024, 9, 29, 14, 15),
      status: 'scheduled' as any,
      doctorName: 'Dr. Farooq'
    }
  ];

  private mockPatientSearchResults: PatientSearchResult[] = [
    { id: '420101-1111', name: 'Ahmed Khan', personalId: '420101-1111' },
    { id: '420202-2222', name: 'Fatima Bano', personalId: '420202-2222' },
    { id: '420303-3333', name: 'Usman Ali', personalId: '420303-3333' },
    { id: '420404-4444', name: 'Hina Shahid', personalId: '420404-4444' },
    { id: '420505-5555', name: 'Imran Qureshi', personalId: '420505-5555' },
    { id: '420606-6666', name: 'Nida Javed', personalId: '420606-6666' }
  ];

  constructor() {}

  getTodaysAppointments(): Observable<Appointment[]> {
    return of(this.mockAppointments).pipe(delay(500));
  }

  getAppointmentById(id: string): Observable<Appointment | undefined> {
    const appointment = this.mockAppointments.find(app => app.id === id);
    return of(appointment).pipe(delay(300));
  }

  searchPatients(searchTerm: string): Observable<PatientSearchResult[]> {
    const filtered = this.mockPatientSearchResults.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.personalId.includes(searchTerm)
    );
    return of(filtered).pipe(delay(300));
  }

  getPatientById(id: string): Observable<Patient | undefined> {
    const mockPatient: Patient = {
      id: id,
      firstName: 'Rehan',
      lastName: 'Malik',
      birthDate: new Date(1985, 3, 10),
      personalId: id,
      phone: '+92 300 1234567',
      email: 'rehan.malik@example.com'
    };
    return of(mockPatient).pipe(delay(300));
  }

  savePatient(patient: Patient): Observable<Patient> {
    return of(patient).pipe(delay(1000));
  }

  getAllPatients(): Observable<PatientSearchResult[]> {
    return of(this.mockPatientSearchResults).pipe(delay(300));
  }
}
