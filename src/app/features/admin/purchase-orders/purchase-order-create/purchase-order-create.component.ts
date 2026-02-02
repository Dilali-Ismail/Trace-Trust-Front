import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../../../core/models/product.models';
import { Supplier } from '../../../../core/models/purchase-order.models';
@Component({
  selector: 'app-purchase-order-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-order-create.component.html'
})
export class PurchaseOrderCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private purchaseOrderService = inject(PurchaseOrderService);
  private productService = inject(ProductService);
  private router = inject(Router);
  products = signal<Product[]>([]);
  suppliers = signal<Supplier[]>([]);
  poForm: FormGroup = this.fb.group({
    supplierId: ['', Validators.required],
    orderLines: this.fb.array([])
  });
  ngOnInit() {
    this.productService.getAll().subscribe(data => this.products.set(data));
    this.purchaseOrderService.getSuppliers().subscribe(data => this.suppliers.set(data));
    this.addLine();
  }
  get orderLines(): FormArray {
    return this.poForm.get('orderLines') as FormArray;
  }
  addLine() {
    const lineGroup = this.fb.group({
      productId: ['', Validators.required],
      quantityOrdered: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    });
    this.orderLines.push(lineGroup);
  }
  removeLine(index: number) {
    this.orderLines.removeAt(index);
  }
  onSubmit() {
    if (this.poForm.invalid) return;
    this.purchaseOrderService.create(this.poForm.value).subscribe({
      next: () => {
        alert('Commande créée avec succès !');
        this.router.navigate(['/admin/purchase-orders']);
      },
      error: (err) => alert('Erreur : ' + (err.error?.message || 'Impossible de créer'))
    });
  }
  cancel() {
    this.router.navigate(['/admin/purchase-orders']);
  }
}
