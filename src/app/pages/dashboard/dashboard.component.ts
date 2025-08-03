import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

interface Appointment {
  id: string;
  patientName: string;
  patientPersonalId: string;
  startTime: Date;
  appointmentType: string;
  notes?: string;
  patientId: string;
}

interface PatientSearchResult {
  id: string;
  name: string;
  personalId: string;
}

interface NavigationItem {
  icon: string;
  label: string;
  route: string;
  hasNotification?: boolean;
  notificationCount?: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCard,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule
  ]
})
export class DashboardComponent implements OnInit {
  appointments$: Observable<Appointment[]>;
  recentPatients$: Observable<PatientSearchResult[]>;
  filteredPatients$: Observable<PatientSearchResult[]>;

  searchTerm: string = '';
  expandedAppointment: string | null = null;

  navigationItems: NavigationItem[] = [
    {
      icon: 'medical_services',
      label: 'Patient Examination',
      route: '/patient-form',
      hasNotification: false
    },
    {
      icon: 'person_add',
      label: 'Patient Visit',
      route: '/patient-form',
      hasNotification: true,
      notificationCount: 1
    },
    {
      icon: 'chat',
      label: 'Doctor Visits',
      route: '/patient-form',
      hasNotification: false
    },
    {
      icon: 'schedule',
      label: 'Working Hours',
      route: '/patient-form',
      hasNotification: false
    },
    {
      icon: 'event',
      label: 'Calendar',
      route: '/patient-form',
      hasNotification: false
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: '/patient-form',
      hasNotification: false
    },
    {
      icon: 'description',
      label: 'Health Portal',
      route: '/patient-form',
      hasNotification: false
    }
  ];

  quickActions = [
    { icon: 'local_hospital', label: 'Hospital Care' },
    { icon: 'science', label: 'Lab Results' },
    { icon: 'assignment', label: 'Certificates' },
    { icon: 'receipt', label: 'Prescriptions' },
    { icon: 'psychology', label: 'Imaging' },
    { icon: 'medication', label: 'Medication List' }
  ];

  private mockAppointments: Appointment[] = [
    {
      id: '1',
      patientName: 'John Smith',
      patientPersonalId: '240545-123Y',
      startTime: new Date('2024-01-01T09:00:00'),
      appointmentType: 'Remote Consultation',
      notes: 'Hello doctor, thank you for accepting the appointment. I need help with new symptoms I started experiencing last week.',
      patientId: '1'
    },
    {
      id: '2',
      patientName: 'Mary Johnson',
      patientPersonalId: '210637-963A',
      startTime: new Date('2024-01-01T09:45:00'),
      appointmentType: 'Remote Consultation',
      patientId: '2'
    },
    {
      id: '3',
      patientName: 'David Wilson',
      patientPersonalId: '060526-741B',
      startTime: new Date('2024-01-01T10:30:00'),
      appointmentType: 'In-person Visit',
      patientId: '3'
    },
    {
      id: '4',
      patientName: 'Sarah Brown',
      patientPersonalId: '060526-741B',
      startTime: new Date('2024-01-01T11:15:00'),
      appointmentType: 'Care Call',
      patientId: '4'
    },
    {
      id: '5',
      patientName: 'Michael Davis',
      patientPersonalId: '060526-741B',
      startTime: new Date('2024-01-01T13:00:00'),
      appointmentType: 'Consultation',
      patientId: '5'
    },
    {
      id: '6',
      patientName: 'Emily Miller',
      patientPersonalId: '151139-258D',
      startTime: new Date('2024-01-01T14:15:00'),
      appointmentType: 'Remote Consultation',
      patientId: '6'
    }
  ];

  private mockPatients: PatientSearchResult[] = [
    { id: '1', name: 'Oliver Wilson', personalId: '240545-123Y' },
    { id: '2', name: 'James Johnson', personalId: '010132-123Y' },
    { id: '3', name: 'Emma Davis', personalId: '150242-456K' },
    { id: '4', name: 'William Brown', personalId: '300630-789P' },
    { id: '5', name: 'Sophia Martinez', personalId: '010141-321N' },
    { id: '6', name: 'Benjamin Anderson', personalId: '041051-654M' }
  ];

  private patientsSubject = new BehaviorSubject<PatientSearchResult[]>(this.mockPatients);

  constructor(private router: Router) {
    this.appointments$ = of(this.mockAppointments);
    this.recentPatients$ = this.patientsSubject.asObservable();
    this.filteredPatients$ = this.recentPatients$.pipe(
      map(patients =>
        patients.filter(p =>
          `${p.name} ${p.personalId}`.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      )
    );
  }

  ngOnInit(): void { }

  onNavigationClick(item: NavigationItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  onOpenPatient(): void {
    this.router.navigate(['/patient-form']);
  }

  onCreateVisit(): void {
    this.router.navigate(['/patient-form']);
  }

  onAppointmentAction(appointment: Appointment, action: string): void {
    console.log(`${action} action for appointment:`, appointment);
    switch (action) {
      case 'call':
        this.handleCall(appointment);
        break;
      case 'visit':
        this.onCreateVisit();
        break;
      case 'patient':
        this.onOpenPatient();
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  }

  private handleCall(appointment: Appointment): void {
    console.log('Starting remote consultation for:', appointment.patientName);
    switch (appointment.appointmentType) {
      case 'Remote Consultation':
      case 'Consultation':
        console.log('Opening video consultation...');
        break;
      case 'Care Call':
        console.log('Starting phone call...');
        break;
      case 'In-person Visit':
        console.log('Starting reception...');
        break;
      default:
        console.log('Starting consultation...');
    }
  }

  onPatientClick(): void {
    this.router.navigate(['/patient-form']);
  }

  onQuickActionClick(action: any): void {
    console.log('Quick action clicked:', action.label);
    this.router.navigate(['/patient-form']);
  }

  addQuickAction(): void {
    console.log('Add new quick action clicked.');
  }

  goToPrevious(): void {
    console.log('Navigate to previous day');
  }

  goToNext(): void {
    console.log('Navigate to next day');
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  getAppointmentTypeClass(type: string): string {
    switch (type) {
      case 'Remote Consultation':
        return 'remote-consultation';
      case 'In-person Visit':
        return 'reception';
      case 'Consultation':
        return 'consultation';
      case 'Care Call':
        return 'care-call';
      default:
        return 'default-type';
    }
  }

  getDefaultDescription(type: string): string {
    switch (type) {
      case 'Remote Consultation':
        return 'Remote consultation appointment.';
      case 'In-person Visit':
        return 'In-person reception visit.';
      case 'Consultation':
        return 'Consultation with the doctor.';
      case 'Care Call':
        return 'Follow-up care phone call.';
      default:
        return 'Appointment details not available.';
    }
  }

  onSearchPatients(): void {
    this.filteredPatients$ = this.recentPatients$.pipe(
      map(patients =>
        patients.filter(p =>
          `${p.name} ${p.personalId}`.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      )
    );
  }

  trackByAppointmentId(index: number, appointment: Appointment): string {
    return appointment.id;
  }

  getPrimaryActionText(appointmentType: string): string {
    switch (appointmentType) {
      case 'Remote Consultation':
        return 'Open remote consultation';
      case 'In-person Visit':
        return 'Start reception';
      case 'Care Call':
        return 'Open remote consultation';
      case 'Consultation':
        return 'Open remote consultation';
      default:
        return 'Open';
    }
  }

  getPrimaryActionIcon(appointmentType: string): string {
    switch (appointmentType) {
      case 'Remote Consultation':
        return 'videocam';
      case 'In-person Visit':
        return 'meeting_room';
      case 'Care Call':
        return 'phone';
      case 'Consultation':
        return 'videocam';
      default:
        return 'play_arrow';
    }
  }
}