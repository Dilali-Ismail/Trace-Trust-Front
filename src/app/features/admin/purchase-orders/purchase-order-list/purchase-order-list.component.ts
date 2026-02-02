import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrder } from '../../../../core/models/purchase-order.models';
@Component({
  selector: 'app-purchase-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-order-list.component.html'
})
export class PurchaseOrderListComponent implements OnInit {
  private purchaseOrderService = inject(PurchaseOrderService);
  private router = inject(Router);

  orders = signal<PurchaseOrder[]>([]);
  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.purchaseOrderService.getAll().subscribe(data => this.orders.set(data));
  }
  goToCreate() {
    this.router.navigate(['/admin/purchase-orders/create']);
  }
  goToDetail(id: string) {
    this.router.navigate(['/admin/purchase-orders', id]);
  }
  getStatusBadgeClass(status: string): string {
    switch(status) {
      case 'APPROVED': return 'bg-blue-50 text-blue-600';
      case 'PARTIALLY_RECEIVED': return 'bg-orange-50 text-orange-600';
      case 'RECEIVED': return 'bg-green-50 text-green-600';
      case 'CANCELED': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  }
}
