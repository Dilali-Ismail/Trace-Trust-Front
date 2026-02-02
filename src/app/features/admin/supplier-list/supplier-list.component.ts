/**
 * 🎓 CONCEPT: Standalone Component & Signals
 */
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../../../core/models/supplier.models';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent implements OnInit {

  suppliers = signal<Supplier[]>([]);
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.loading.set(false);
      }
    });
  }

  deleteSupplier(supplier: Supplier): void {
    if (!supplier.id) return;

    if (confirm(`Voulez-vous vraiment supprimer "${supplier.name}" ?`)) {
      this.supplierService.deleteSupplier(supplier.id).subscribe({
        next: () => this.loadSuppliers(),
        error: (err) => this.errorMessage.set(err.message)
      });
    }
  }
}
