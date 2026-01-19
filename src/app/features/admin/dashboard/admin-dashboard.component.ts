import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {
    // On injecte le service pour récupérer le nom de l'utilisateur connecté
    authService = inject(AuthService);

    // Données statiques pour l'étape 2 (comme demandé)
    stats = [
        { label: 'Total Commandes', value: '1,250', icon: '📦', color: 'blue' },
        { label: 'Taux Livraison', value: '98.5%', icon: '🚚', color: 'green' },
        { label: 'Ruptures Stock', value: '12', icon: '🚨', color: 'red' },
        { label: 'Produits Actifs', value: '342', icon: '✅', color: 'indigo' }
    ];
}
