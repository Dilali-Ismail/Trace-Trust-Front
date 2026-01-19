import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  productForm: FormGroup;
  selectedFile?: File;
  isEdit = false;
  productId?: string;
  constructor() {
    this.productForm = this.fb.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      category: ['ELECTRONICS', Validators.required], // Valeur par défaut
      costPrice: [0, [Validators.required, Validators.min(0.01)]],
      active: [true]
    });
  }
  ngOnInit() {
    // Si on a un ID dans l'URL, c'est une modification !
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEdit = true;
      // Charger les données du produit pour remplir le formulaire
      this.productService.getAll().subscribe(list => {
        const p = list.find(x => x.id === this.productId);
        if (p) this.productForm.patchValue(p);
      });
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    if (this.productForm.invalid) return;
    const action = this.isEdit
      ? this.productService.update(this.productId!, this.productForm.value, this.selectedFile)
      : this.productService.create(this.productForm.value, this.selectedFile);
    action.subscribe({
      next: () => this.router.navigate(['/admin/products']),
      error: (err) => alert('Erreur lors de la sauvegarde')
    });
  }
}
