import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true, 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule
  ]
})
export class HeaderComponent implements OnInit {
    currentUser = {
    name: 'Waleed Shehbaz',
    role: 'Developer',
    id: 'Task Assigned'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearchSubmit(): void {
    console.log('Search submitted');
  }

  navigateToPatientForm(): void {
    this.router.navigate(['/patient-form']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  onSettingsClick(): void {
    console.log('Settings clicked');
    this.router.navigate(['/settings']);
  }

  onProfileClick(): void {
    console.log('Profile clicked');
    this.router.navigate(['/admin']);
  }

  onLogoutClick(): void {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}