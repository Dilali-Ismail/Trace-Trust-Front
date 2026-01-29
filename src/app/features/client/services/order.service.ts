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
  // Pour le Manager : Liste filtrée par statut (CREATED)
  getOrdersByStatus(status: string): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(`${this.apiUrl}?status=${status}`);
  }
  // Pour le Client : Ses propres commandes
  getMyOrders(): Observable<SalesOrder[]> {
    return this.http.get<SalesOrder[]>(this.apiUrl);
  }
  // Action RESERVER (Manager) - Nécessite un warehouseId
  reserve(orderId: string, warehouseId: string): Observable<SalesOrder> {
    return this.http.post<SalesOrder>(`${this.apiUrl}/${orderId}/reserve?warehouseId=${warehouseId}`, {});
  }
  // Demander RESERVATION (Client)
  requestReservation(orderId: string): Observable<SalesOrder> {
    return this.http.post<SalesOrder>(`${this.apiUrl}/${orderId}/request-reservation`, {});
  }
}
