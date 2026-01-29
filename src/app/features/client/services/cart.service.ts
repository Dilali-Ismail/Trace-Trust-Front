import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../../core/models/product.models';
import { OrderItem } from '../../../core/models/order.models';
@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<OrderItem[]>([]);
  items = this.cartItems.asReadonly();
  count = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  total = computed(() => this.cartItems().reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0));
  addToCart(product: Product) {
    const current = this.cartItems();
    const existing = current.find(i => i.productId === product.id);
    if (existing) {
      this.cartItems.set(current.map(i =>
        i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.cartItems.set([...current, {
        productId: product.id!,
        productName: product.name,
        quantity: 1,
        unitPrice: product.costPrice
      }]);
    }
  }
  updateQuantity(productId: string, qty: number) {
    if (qty <= 0) return this.removeFromCart(productId);
    this.cartItems.set(this.cartItems().map(i =>
      i.productId === productId ? { ...i, quantity: qty } : i
    ));
  }
  removeFromCart(productId: string) {
    this.cartItems.set(this.cartItems().filter(i => i.productId !== productId));
  }
  clear() {
    this.cartItems.set([]);
  }
}
