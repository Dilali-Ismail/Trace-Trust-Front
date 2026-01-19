import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarehouseService } from '../../services/warehouse.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'; // 👈 Ajoute ActivatedRoute
@Component({
  selector: 'app-warehouse-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './warehouse-form.component.html'
})
export class WarehouseFormComponent implements OnInit { // 👈 Ajoute "implements OnInit"
  private fb = inject(FormBuilder);
  private warehouseService = inject(WarehouseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // 👈 Injecte la route active
  warehouseForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', Validators.required],
    active: [true]
  });
  isEdit = false; // Pour savoir si on est en mode édition
  warehouseId?: string;
  ngOnInit() {
    // 🔍 On regarde si on a un ID dans l'URL (ex: /admin/warehouses/edit/123)
    this.warehouseId = this.route.snapshot.params['id'];

    if (this.warehouseId) {
      this.isEdit = true;
      // On récupère les données et on REMPLIT le formulaire
      this.warehouseService.getById(this.warehouseId).subscribe(data => {
        this.warehouseForm.patchValue(data); // 👈 patchValue remplit les champs tout seul !
      });
    }
  }
  onSubmit() {
    if (this.warehouseForm.invalid) return;
    // 🚀 Selon le mode, on appelle create ou update
    const action = this.isEdit
      ? this.warehouseService.update(this.warehouseId!, this.warehouseForm.value)
      : this.warehouseService.create(this.warehouseForm.value);
    action.subscribe(() => {
      this.router.navigate(['/admin/warehouses']);
    });
  }
}
