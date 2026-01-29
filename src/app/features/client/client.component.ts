import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './services/order.service';
import { SalesOrder } from '../../core/models/order.models';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  private orderService = inject(OrderService);
  orders = signal<SalesOrder[]>([]);
  expandedOrderId = signal<string | null>(null);

  ngOnInit() {
    this.orderService.getMyOrders().subscribe(data => {
      const enriched = data.map(o => ({
        ...o,
        totalAmount: o.totalAmount || this.calculateTotal(o)
      }));
      this.orders.set(enriched);
    });
  }

  toggleDetails(id: string) {
    this.expandedOrderId.set(this.expandedOrderId() === id ? null : id);
  }

  private calculateTotal(order: SalesOrder): number {
    return (order.orderLines || []).reduce((acc, line) => acc + (line.unitPrice * line.quantity), 0);
  }
}
