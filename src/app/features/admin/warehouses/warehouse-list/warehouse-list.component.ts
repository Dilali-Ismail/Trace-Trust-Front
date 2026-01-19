import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WarehouseService } from '../../services/warehouse.service';
import { Warehouse } from '../../../../core/models/warehouse.models';
@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './warehouse-list.component.html'
})
export class WarehouseListComponent implements OnInit {
  private warehouseService = inject(WarehouseService);

  warehouses: Warehouse[] = [];
  loading = false;
  // Image locale par défaut (placeholder)
  defaultImage = 'https://cdn-icons-png.flaticon.com/512/2271/2271068.png';
  ngOnInit() {
    this.refresh();
  }
  refresh() {
    this.loading = true;
    this.warehouseService.getAll().subscribe({
      next: (data) => {
        this.warehouses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur !', err);
        this.loading = false;
      }
    });
  }

  onDelete(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet entrepôt ?')) {
      this.warehouseService.delete(id).subscribe({
        next: () => {
          this.refresh();
        },
        error: (err) => {
          alert('Erreur lors de la suppression');
          console.error(err);
        }
      });
    }
  }
}
