import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'patient-form',
    loadComponent: () => import('./pages/patient-form/patient-form.component').then(m => m.PatientFormComponent)
  },
  { 
    path: '**', 
    redirectTo: '/dashboard' 
  }
];