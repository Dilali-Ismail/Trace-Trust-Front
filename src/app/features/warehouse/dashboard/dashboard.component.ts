import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

   authService = inject(AuthService);
   today = new Date();

  stats = [
    { label: 'Articles en Stock', value: '4,215', icon: '📦', color: 'blue' },
    { label: 'Réceptions du jour', value: '18', icon: '📥', color: 'green' },
    { label: 'Expéditions à faire', value: '7', icon: '📤', color: 'orange' },
    { label: 'Alertes Rupture', value: '5', icon: '⚠️', color: 'red' }
  ];
  alerts = [
    { name: 'iPhone 15 Pro Case', sku: 'ACC-IP15-01', stock: 2, min: 10 },
    { name: 'MacBook Air Charger', sku: 'POW-MBA-M2', stock: 0, min: 5 },
    { name: 'USB-C Cable 2m', sku: 'CAB-UC2-WH', stock: 3, min: 20 }
  ];

}
