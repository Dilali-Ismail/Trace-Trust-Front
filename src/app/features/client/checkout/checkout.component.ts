import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { CreateSalesOrderRequest } from '../../../core/models/order.models';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'


})
export class CheckoutComponent {
  cart = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  increment(pid: string, qty: number) {
    this.cart.updateQuantity(pid, qty + 1);
  }

  decrement(pid: string, qty: number) {
    if (qty > 1) {
      this.cart.updateQuantity(pid, qty - 1);
    } else {
      this.cart.removeFromCart(pid);
    }
  }

  updateQty(pid: string, val: string) {
    this.cart.updateQuantity(pid, parseInt(val));
  }
  submitOrder() {
    // On envoie directement les lignes de commande
    const request: CreateSalesOrderRequest = {
      orderLines: this.cart.items().map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: i.unitPrice
      }))
    };
    this.orderService.create(request).subscribe({
      next: (order) => {
        alert(`Commande #${order.id.substring(0, 8)} créée avec succès !`);
        this.cart.clear();
        this.router.navigate(['/client']);
      },
      error: (err) => alert('Erreur : ' + (err.error?.message || 'Impossible de créer la commande'))
    });
  }
}
