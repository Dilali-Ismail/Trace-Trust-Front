import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { WarehouseService } from '../../../admin/services/warehouse.service';
import { ProductService } from '../../../admin/services/product.service';
import { StockMovement, CreateMovementRequest } from '../../../../core/models/stock.models';
import { Warehouse } from '../../../../core/models/warehouse.models';
import { Product } from '../../../../core/models/product.models';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-movement-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movement-list.component.html'
})
export class MovementListComponent implements OnInit {
  private stockService = inject(StockService);
  private warehouseService = inject(WarehouseService);
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  movements = signal<StockMovement[]>([]);
  warehouses = signal<Warehouse[]>([]);
  products = signal<Product[]>([]);
  private route = inject(ActivatedRoute);

  movementForm: FormGroup = this.fb.group({
    warehouseId: ['', Validators.required],
    productId: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    type: ['INBOUND', Validators.required],
    referenceDocument: ['']
  });
  ngOnInit() {
    this.warehouseService.getAll().subscribe(data => this.warehouses.set(data));
    this.productService.getAll().subscribe(data => this.products.set(data));

    this.route.queryParams.subscribe(params => {
      const wId = params['warehouseId'];
      const pId = params['productId'];
      this.loadHistory(wId, pId);
    });
  }
  loadHistory(warehouseId?: string, productId?: string) {
    this.stockService.getHistory(warehouseId, productId).subscribe(data => {
      this.movements.set(data);
    });
  }
  onSubmit() {
    if (this.movementForm.invalid) return;
    const request: CreateMovementRequest = this.movementForm.value;
    this.stockService.createMovement(request).subscribe({
      next: () => {
        this.loadHistory();
        this.movementForm.patchValue({ quantity: 1, referenceDocument: '' });
        alert('Mouvement enregistré avec succès !');
      },
      error: (err) => alert('Erreur lors de l\'enregistrement : ' + (err.error?.message || 'Erreur inconnue'))
    });
  }
}
