import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../../../core/models/auth.models';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  users: User[] = [];
  loading = false;
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  onToggleStatus(user: User) {
    this.userService.toggleStatus(user.id).subscribe({
      next: () => {
        // On rafraîchit simplement la liste pour voir le changement
        this.loadUsers();
      },
      error: () => alert('Erreur lors du changement de statut')
    });
  }
}
