import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PurchaseOrder, CreatePurchaseOrderRequest, ReceivePurchaseOrderRequest } from '../../../core/models/purchase-order.models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/purchase-orders`;

  getAll(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.apiUrl);
  }

  // Si l'API suppliers n'existe pas, on peut utiliser un mock temporaire ou un endpoint dédié
  getSuppliers(): Observable<import('../../../core/models/purchase-order.models').Supplier[]> {
    // Note: Ajuster l'URL selon votre backend réel. Si /api/suppliers n'existe pas, demandez au backend.
    return this.http.get<import('../../../core/models/purchase-order.models').Supplier[]>(`${environment.apiUrl}/api/suppliers`);
  }

  getById(id: string): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.apiUrl}/${id}`);
  }

  create(request: CreatePurchaseOrderRequest): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(this.apiUrl, request);
  }

  receive(id: string, request: ReceivePurchaseOrderRequest): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(`${this.apiUrl}/${id}/receive`, request);
  }
}
