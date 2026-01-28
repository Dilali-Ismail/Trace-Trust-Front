import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { WarehouseService } from '../../../admin/services/warehouse.service';
import { Stock } from '../../../../core/models/stock.models';
import { Warehouse } from '../../../../core/models/warehouse.models';
@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-list.component.html'
})
export class InventoryListComponent implements OnInit {
  private stockService = inject(StockService);
  private warehouseService = inject(WarehouseService);

  warehouses = signal<Warehouse[]>([]);
  inventory = signal<Stock[]>([]);

  selectedWarehouseId = signal<string>('');
  searchQuery = signal<string>('');
  // 💡 Filtrage réactif automatique
  filteredInventory = computed(() => {
    return this.inventory().filter(item => {
      return item.productSku.toLowerCase().includes(this.searchQuery().toLowerCase());
    });
  });
  ngOnInit() {
    // Charger la liste des entrepôts pour le dropdown
    this.warehouseService.getAll().subscribe(data => this.warehouses.set(data));
    this.loadInventory();
  }
  loadInventory() {
    this.stockService.getInventory(this.selectedWarehouseId()).subscribe(data => {
      this.inventory.set(data);
    });
  }
}
