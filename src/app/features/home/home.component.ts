import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../admin/services/product.service';
import { Product } from '../../core/models/product.models';
import { CartService } from '../client/services/cart.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  private cartService = inject(CartService);

  selectedCategory = signal<string>('Tous');
  searchQuery = signal<string>('');



  // Filtrage combiné (Catégorie déjà filtrée par backend + Recherche locale)
  filteredProducts = computed(() => {
    return this.products().filter(p =>
      p.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      p.sku.toLowerCase().includes(this.searchQuery().toLowerCase())
    );
  });
  ngOnInit() {
    this.loadProducts();
    this.productService.getAllCategories().subscribe(cats => this.categories.set(cats));
  }
  loadProducts(category: string = 'Tous') {
    this.selectedCategory.set(category);
    if (category === 'Tous') {
      this.productService.getAll().subscribe(data => this.products.set(data));
    } else {
      this.productService.getByCategory(category).subscribe(data => this.products.set(data));
    }
  }
  addToCart(p: Product) {
    this.cartService.addToCart(p);
    alert(`${p.name} ajouté au panier ! 🛒`);
  }
}
