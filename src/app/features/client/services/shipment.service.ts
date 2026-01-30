import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Shipment, CreateShipmentRequest, Carrier } from '../../../core/models/shipment.models';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ShipmentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/shipments`;

  getMyShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl);
  }

  getShipmentById(id: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
  }

  getCarriers(): Observable<Carrier[]> {
    return this.http.get<Carrier[]>(`${environment.apiUrl}/api/carriers`);
  }

  createShipment(request: CreateShipmentRequest): Observable<Shipment> {
    return this.http.post<Shipment>(this.apiUrl, request);
  }

  dispatch(shipmentId: string, warehouseId: string): Observable<Shipment> {
    return this.http.post<Shipment>(`${this.apiUrl}/${shipmentId}/dispatch?warehouseId=${warehouseId}`, {});
  }

  markAsDelivered(shipmentId: string): Observable<Shipment> {
    return this.http.patch<Shipment>(`${this.apiUrl}/${shipmentId}/deliver`, {});
  }
}
