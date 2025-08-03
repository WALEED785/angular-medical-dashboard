import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class PatientFormComponent implements OnInit {

  patientForm: FormGroup;
  isLoading = false;

  visitTypes = [
    { value: 'draft', label: 'Draft' },
    { value: 'completed', label: 'Completed' },
    { value: 'approved', label: 'Approved' }
  ];

  appointmentTypes = [
    { value: 'remote_consultation', label: 'Remote Consultation' },
    { value: 'appointment', label: 'Appointment' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'treatment_call', label: 'Treatment Call' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.patientForm = this.createForm();
  }

  ngOnInit(): void {
    this.setDefaultValues();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      patientName: ['', Validators.required],
      birthDate: ['', Validators.required],
      personalId: ['', Validators.required],
      appointmentType: ['', Validators.required],
      visitReason: ['', Validators.required],
      visitStatus: ['draft', Validators.required],
      doctorName: ['Dr. Thomas Victor Kerola', Validators.required],
      appointmentDate: ['29/10/2024', Validators.required],
      notes: ['']
    });
  }

  private setDefaultValues(): void {
    this.patientForm.patchValue({
      appointmentDate: '29/10/2024',
      doctorName: 'Dr. Thomas Victor Kerola',
      visitStatus: 'draft'
    });
  }

  onSave(): void {
    if (this.patientForm.valid) {
      this.isLoading = true;
      const formValue = this.patientForm.value;

      setTimeout(() => {
        console.log('Patient saved:', formValue);
        this.isLoading = false;
        this.showSuccessMessage('Patient information saved successfully!');
        this.router.navigate(['/dashboard']);
      }, 1000);
    } else {
      this.markFormGroupTouched();
      this.showValidationErrors();
    }
  }

  onCancel(): void {
    if (this.patientForm.dirty) {
      const confirmClose = confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmClose) {
        return;
      }
    }

    this.router.navigate(['/dashboard']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.patientForm.controls).forEach(key => {
      const control = this.patientForm.get(key);
      control?.markAsTouched();
    });
  }

  private showValidationErrors(): void {
    const firstErrorField = Object.keys(this.patientForm.controls)
      .find(key => this.patientForm.get(key)?.invalid);

    if (firstErrorField) {
      console.log(`Please check the ${firstErrorField} field`);
    }
  }

  private showSuccessMessage(message: string): void {
    console.log(message);
  }

  getFormTitle(): string {
    return 'Patient Information Form';
  }

  getCurrentDateTime(): string {
    return '14:49';
  }

  get firstName() { return this.patientForm.get('firstName'); }
  get lastName() { return this.patientForm.get('lastName'); }
  get birthDate() { return this.patientForm.get('birthDate'); }
  get personalId() { return this.patientForm.get('personalId'); }
  get appointmentType() { return this.patientForm.get('appointmentType'); }
  get visitReason() { return this.patientForm.get('visitReason'); }
  get visitStatus() { return this.patientForm.get('visitStatus'); }
  get doctorName() { return this.patientForm.get('doctorName'); }
  get appointmentDate() { return this.patientForm.get('appointmentDate'); }
  get notes() { return this.patientForm.get('notes'); }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.patientForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.patientForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'patientName': 'Patient name',
      'birthDate': 'Date of birth',
      'personalId': 'Patient ID',
      'appointmentType': 'Appointment type',
      'visitReason': 'Visit reason',
      'visitStatus': 'Status',
      'doctorName': 'Doctor name',
      'appointmentDate': 'Appointment date'
    };

    return displayNames[fieldName] || fieldName;
  }
}