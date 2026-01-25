import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/auth.models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/users`;
  private authUrl = `${environment.apiUrl}/auth`;



  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

   toggleStatus(id: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${id}/toggle-status`, {});
  }

  create(user: any): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/register`, user);
  }


}
