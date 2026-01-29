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
  ngOnInit() {
    this.orderService.getMyOrders().subscribe(data => {
      // On enrichit les données si le totalAmount est manquant
      const enrichedOrders = data.map(order => ({
        ...order,
        totalAmount: order.totalAmount || this.calculateTotal(order)
      }));
      this.orders.set(enrichedOrders);
    });
  }

  private calculateTotal(order: SalesOrder): number {
    return (order.orderLines || []).reduce((acc, line) => acc + (line.unitPrice * line.quantity), 0);
  }
}
