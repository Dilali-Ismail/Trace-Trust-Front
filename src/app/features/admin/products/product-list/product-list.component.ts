import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.models';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  loading = false;
  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur Backend !', err);
        this.loading = false;
      }
    });
  }
  onDelete(id: string) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.productService.delete(id).subscribe(() => {
        this.refresh();
      });
    }
  }
}
