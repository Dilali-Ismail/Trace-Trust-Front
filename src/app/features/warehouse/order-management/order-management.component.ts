import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../client/services/order.service';
import { WarehouseService } from '../../admin/services/warehouse.service';
import { SalesOrder } from '../../../core/models/order.models';
import { Warehouse } from '../../../core/models/warehouse.models';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-management.component.html'
})
export class OrderManagementComponent implements OnInit {
  private orderService = inject(OrderService);
  private warehouseService = inject(WarehouseService);
  orders = signal<SalesOrder[]>([]);
  warehouses = signal<Warehouse[]>([]);
  expandedOrderId = signal<string | null>(null);
  selectedWhSelection: { [key: string]: string } = {}; // Store chosen WH per order

  ngOnInit() {
    this.orderService.getOrdersByStatus('CREATED').subscribe(data => this.orders.set(data));
    this.warehouseService.getAll().subscribe(data => this.warehouses.set(data));
  }

  toggleDetails(id: string) {
    this.expandedOrderId.set(this.expandedOrderId() === id ? null : id);
  }
  doReserve(order: SalesOrder) {
    const whId = this.selectedWhSelection[order.id];
    if (!whId) return alert("Veuillez sélectionner un entrepôt !");
    this.orderService.reserve(order.id, whId).subscribe({
      next: (res) => {
        alert("Réservation effectuée ! Statut : " + res.status);
        this.ngOnInit(); // Refresh list
      },
      error: (err) => {
        if (err.status === 409) alert("Conflit : Le stock a changé. Veuillez rafraîchir.");
        else alert("Erreur lors de la réservation.");
      }
    });
  }
}
