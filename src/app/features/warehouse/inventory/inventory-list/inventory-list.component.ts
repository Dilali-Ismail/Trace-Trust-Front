import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { WarehouseService } from '../../../admin/services/warehouse.service';
import { ProductService } from '../../../admin/services/product.service';
import { Stock } from '../../../../core/models/stock.models';
import { Warehouse } from '../../../../core/models/warehouse.models';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inventory-list.component.html'
})
export class InventoryListComponent implements OnInit {
  private stockService = inject(StockService);
  private warehouseService = inject(WarehouseService);
  private productService = inject(ProductService);

  warehouses = signal<Warehouse[]>([]);
  inventory = signal<Stock[]>([]);
  productNames = signal<Map<string, string>>(new Map());

  selectedWarehouseId = signal<string>('');
  searchQuery = signal<string>('');

  // 💡 Filtrage réactif automatique sur les SKUs chargés
  filteredInventory = computed(() => {
    return this.inventory().filter(item => {
      return item.productSku.toLowerCase().includes(this.searchQuery().toLowerCase());
    });
  });

  ngOnInit() {
    this.warehouseService.getAll().subscribe(data => this.warehouses.set(data));
    this.loadInventory();
  }

  loadInventory() {
    this.stockService.getInventory(this.selectedWarehouseId()).subscribe(data => {
      this.inventory.set(data);

      // Charger les noms pour chaque produit
      data.forEach(item => {
        if (!this.productNames().has(item.productSku)) {
          this.productService.getBySku(item.productSku).subscribe({
            next: (p) => {
              const currentMap = new Map(this.productNames());
              currentMap.set(item.productSku, p.name);
              this.productNames.set(currentMap);
            },
            error: () => {
              const currentMap = new Map(this.productNames());
              currentMap.set(item.productSku, 'Inconnu');
              this.productNames.set(currentMap);
            }
          });
        }
      });
    });
  }
}
