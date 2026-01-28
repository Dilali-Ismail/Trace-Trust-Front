import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../admin/services/product.service';
import { Product } from '../../core/models/product.models';
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
}
