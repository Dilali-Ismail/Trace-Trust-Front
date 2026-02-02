/**
 * 🎓 CONCEPT: Reactive Forms
 */
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent implements OnInit {

  isEditMode = signal<boolean>(false);
  supplierId = signal<string | null>(null);
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');

  supplierForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    contactInfo: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.supplierId.set(id);
      this.loadSupplier(id);
    }
  }

  private loadSupplier(id: string): void {
    this.loading.set(true);
    this.supplierService.getSupplier(id).subscribe({
      next: (supplier) => {
        this.supplierForm.patchValue({
          name: supplier.name,
          contactInfo: supplier.contactInfo
        });
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) {
      Object.keys(this.supplierForm.controls).forEach(key => {
        this.supplierForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const formData = {
      name: this.supplierForm.get('name')?.value || '',
      contactInfo: this.supplierForm.get('contactInfo')?.value || ''
    };

    const request$ = (this.isEditMode() && this.supplierId())
      ? this.supplierService.updateSupplier(this.supplierId()!, formData)
      : this.supplierService.createSupplier(formData);

    request$.subscribe({
      next: () => this.router.navigate(['/admin/suppliers']),
      error: (error) => {
        this.errorMessage.set(error.message);
        this.loading.set(false);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.supplierForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.supplierForm.get(fieldName);
    if (field?.errors?.['required']) return 'Ce champ est obligatoire';
    if (field?.errors?.['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    return '';
  }

  cancel(): void {
    this.router.navigate(['/admin/suppliers']);
  }
}
