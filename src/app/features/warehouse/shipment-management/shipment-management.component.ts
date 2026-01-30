import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShipmentService } from '../../client/services/shipment.service';
import { OrderService } from '../../client/services/order.service';
import { WarehouseService } from '../../admin/services/warehouse.service';
import { Shipment, Carrier } from '../../../core/models/shipment.models';
import { SalesOrder } from '../../../core/models/order.models';
import { Warehouse } from '../../../core/models/warehouse.models';
@Component({
  selector: 'app-shipment-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shipment-management.component.html'
})
export class ShipmentManagementComponent implements OnInit {
  private shipmentService = inject(ShipmentService);
  private orderService = inject(OrderService);
  private warehouseService = inject(WarehouseService);
  private fb = inject(FormBuilder);
  shipments = signal<Shipment[]>([]);
  carriers = signal<Carrier[]>([]);
  reservedOrders = signal<SalesOrder[]>([]);
  warehouses = signal<Warehouse[]>([]);
  shipmentForm: FormGroup = this.fb.group({
    salesOrderId: ['', Validators.required],
    carrierId: ['', Validators.required],
    trackingNumber: ['', Validators.required]
  });
  ngOnInit() {
    this.loadShipments();
    this.shipmentService.getCarriers().subscribe(data => this.carriers.set(data));
    this.orderService.getOrdersByStatus('RESERVED').subscribe(data => this.reservedOrders.set(data));
    this.warehouseService.getAll().subscribe(data => this.warehouses.set(data));
  }
  loadShipments() {
    this.shipmentService.getMyShipments().subscribe(data => this.shipments.set(data));
  }
  createShipment() {
    if (this.shipmentForm.invalid) return;
    this.shipmentService.createShipment(this.shipmentForm.value).subscribe({
      next: () => {
        alert('Expédition créée avec succès !');
        this.loadShipments();
        this.shipmentForm.reset();
      },
      error: (err) => alert('Erreur : ' + (err.error?.message || 'Impossible de créer l\'expédition'))
    });
  }
  dispatchShipment(shipmentId: string) {
    const whId = this.warehouses()[0]?.id; // Simplification : premier entrepôt
    if (!whId) return alert("Aucun entrepôt disponible !");
    this.shipmentService.dispatch(shipmentId, whId).subscribe({
      next: () => {
        alert('Expédition effectuée ! Statut: IN_TRANSIT');
        this.loadShipments();
      },
      error: (err) => alert('Erreur : ' + (err.error?.message || 'Impossible d\'expédier'))
    });
  }
  markDelivered(shipmentId: string) {
    this.shipmentService.markAsDelivered(shipmentId).subscribe({
      next: () => {
        alert('Marquée comme livrée !');
        this.loadShipments();
      },
      error: (err) => alert('Erreur : ' + (err.error?.message || 'Impossible de marquer comme livrée'))
    });
  }
}
