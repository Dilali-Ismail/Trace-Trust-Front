import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarehouseService } from '../../services/warehouse.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-warehouse-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './warehouse-form.component.html'
})
export class WarehouseFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private warehouseService = inject(WarehouseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  warehouseForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', Validators.required],
    active: [true]
  });
  isEdit = false;
  warehouseId?: string;
  ngOnInit() {

    this.warehouseId = this.route.snapshot.params['id'];

    if (this.warehouseId) {
      this.isEdit = true;

      this.warehouseService.getById(this.warehouseId).subscribe(data => {
        this.warehouseForm.patchValue(data);
      });
    }
  }
  onSubmit() {
    if (this.warehouseForm.invalid) return;

    const action = this.isEdit
      ? this.warehouseService.update(this.warehouseId!, this.warehouseForm.value)
      : this.warehouseService.create(this.warehouseForm.value);
    action.subscribe(() => {
      this.router.navigate(['/admin/warehouses']);
    });
  }
}
