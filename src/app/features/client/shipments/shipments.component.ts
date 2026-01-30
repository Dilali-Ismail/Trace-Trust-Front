import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentService } from '../services/shipment.service';
import { Shipment } from '../../../core/models/shipment.models';
@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipments.component.html'
})
export class ShipmentsComponent implements OnInit {
  private shipmentService = inject(ShipmentService);
  shipments = signal<Shipment[]>([]);
  expandedShipmentId = signal<string | null>(null);
  ngOnInit() {
    this.shipmentService.getMyShipments().subscribe(data => this.shipments.set(data));
  }
  toggleDetails(id: string) {
    this.expandedShipmentId.set(this.expandedShipmentId() === id ? null : id);
  }
  getStatusBadgeClass(status: string): string {
    switch(status) {
      case 'PLANNED': return 'bg-blue-50 text-blue-600';
      case 'IN_TRANSIT': return 'bg-orange-50 text-orange-600';
      case 'DELIVERED': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  }
}
