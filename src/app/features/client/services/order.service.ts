import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CreateSalesOrderRequest, SalesOrder } from '../../../core/models/order.models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/sales-orders`;
  create(request: CreateSalesOrderRequest): Observable<SalesOrder> {
    return this.http.post<SalesOrder>(this.apiUrl, request);
  }
  getMyOrders(): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(this.apiUrl);
  }
  getById(id: string): Observable<SalesOrder> {
    return this.http.get<SalesOrder>(`${this.apiUrl}/${id}`);
  }
  cancel(id: string): Observable<SalesOrder> {
    return this.http.patch<SalesOrder>(`${this.apiUrl}/${id}/cancel`, {});
  }
}
