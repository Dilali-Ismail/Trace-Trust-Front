import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Stock , StockMovement , CreateMovementRequest } from '../../../core/models/stock.models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class StockService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/inventory`;

  getInventory(warehouseId?: string): Observable<Stock[]> {
    let params = new HttpParams();
    if (warehouseId) {
      params = params.set('warehouseId', warehouseId);
    }
    return this.http.get<Stock[]>(this.apiUrl, { params });
  }

 getHistory(warehouseId?: string, productId?: string): Observable<StockMovement[]> {
  let params = new HttpParams();
  if (warehouseId) params = params.set('warehouseId', warehouseId);
  if (productId) params = params.set('productId', productId);

  return this.http.get<StockMovement[]>(`${this.apiUrl}/history`, { params });
}

  createMovement(request: CreateMovementRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/movements`, request);
  }
}
