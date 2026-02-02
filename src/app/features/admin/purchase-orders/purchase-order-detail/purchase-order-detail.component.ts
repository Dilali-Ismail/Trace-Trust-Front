import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { WarehouseService } from '../../services/warehouse.service';
import { PurchaseOrder, PurchaseOrderLine } from '../../../../core/models/purchase-order.models';
import { Warehouse } from '../../../../core/models/warehouse.models';
@Component({
  selector: 'app-purchase-order-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './purchase-order-detail.component.html'
})
export class PurchaseOrderDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private purchaseOrderService = inject(PurchaseOrderService);
  private warehouseService = inject(WarehouseService);
  order = signal<PurchaseOrder | null>(null);
  warehouses = signal<Warehouse[]>([]);
  receiveForm = this.fb.group({
    warehouseId: ['', Validators.required],
    referenceDocument: [''],
    receivedLines: this.fb.array([])
  });
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrder(id);
      this.warehouseService.getAll().subscribe(data => this.warehouses.set(data));
    }
  }
  loadOrder(id: string) {
    this.purchaseOrderService.getById(id).subscribe(data => {
      console.log('📦 Purchase Order loaded:', data);
      console.log('📋 Order Lines:', data.orderLines);
      console.log('🔍 First order line structure:', data.orderLines[0]);
      this.order.set(data);
      this.initReceiveLines(data.orderLines);
    });
  }
  initReceiveLines(lines: PurchaseOrderLine[]) {
    const arr = this.receiveForm.get('receivedLines') as FormArray;
    arr.clear();
    lines.forEach(line => {
      arr.push(this.fb.group({
        purchaseOrderLineId: [line.id || line.productId], // Utilise l'ID de ligne si dispo, sinon productId
        quantityReceived: [0, [Validators.min(0)]]
      }));
    });
  }
  getRemainingQty(line: PurchaseOrderLine): number {
    return line.quantityOrdered - line.quantityReceived;
  }
  onReceive() {
    if (this.receiveForm.invalid || !this.order()) return;

    // On récupère les valeurs brutes
    const formValue = this.receiveForm.value;

    // 1. Filtrer les lignes avec quantité > 0
    // 2. Mapper purchaseOrderLineId vers purchaseOrderlinId (typo backend)
    const validLines = (formValue.receivedLines as any[])
      .filter(line => line.quantityReceived > 0)
      .map(line => ({
        purchaseOrderlinId: line.purchaseOrderLineId, // 👈 Correction typo backend
        quantityReceived: line.quantityReceived
      }));

    if (validLines.length === 0) {
      alert("Veuillez saisir une quantité supérieure à 0 pour au moins un article.");
      return;
    }

    const request = {
      warehouseId: formValue.warehouseId,
      referenceDocument: formValue.referenceDocument,
      receivedLines: validLines
    };

    console.log('Sending receive request:', request);

    this.purchaseOrderService.receive(this.order()!.id, request as any).subscribe({
      next: () => {
        alert('Réception enregistrée !');
        this.loadOrder(this.order()!.id);
        this.receiveForm.patchValue({ referenceDocument: '' });
      },
      error: (err) => {
        console.error('Erreur réception:', err);
        alert(`Erreur (${err.status}): ${err.error?.message || 'Impossible de réceptionner'}`);
      }
    });
  }
  goBack() {
    this.router.navigate(['/admin/purchase-orders']);
  }
}
