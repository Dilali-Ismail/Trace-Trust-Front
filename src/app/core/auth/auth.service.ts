import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LoginRequest, AuthResponse, UserRole, User, RegisterRequest } from '../models/auth.models';
import { tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  accessToken = signal<string | null>(localStorage.getItem('access_token'));
  role = signal<UserRole | null>(localStorage.getItem('user_role') as UserRole);
  userName = signal<string | null>(localStorage.getItem('user_name')); // 👈 Nouveau : pour stocker le nom

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('user_role', res.role);
        localStorage.setItem('user_name', res.email.split('@')[0]); // 👈 Pour l'instant on utilise le début de l'email

        this.accessToken.set(res.accessToken);
        this.role.set(res.role);
        this.userName.set(res.email.split('@')[0]);

        this.redirectAfterLogin(res.role);
      })
    );
  }
  register(userData: RegisterRequest) {
    return this.http.post<User>(`${this.apiUrl}/register`, userData);
  }
  private redirectAfterLogin(role: UserRole) {
    switch (role) {
      case 'ADMIN': this.router.navigate(['/admin']); break;
      case 'WAREHOUSE_MANAGER': this.router.navigate(['/warehouse']); break;
      case 'CLIENT': this.router.navigate(['/client']); break;
      default: this.router.navigate(['/']);
    }
  }
  logout() {
    localStorage.clear();
    this.accessToken.set(null);
    this.role.set(null);
    this.router.navigate(['/login']);
  }
}
