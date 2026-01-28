import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { roleGuard } from './core/guards/role.guard';
import { AdminComponent } from './features/admin/admin.component';
import { WarehouseComponent } from './features/warehouse/warehouse.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },

      // Routes protégées par rôle (ADMIN)
      {
        path: 'admin',
        canActivate: [roleGuard(['ADMIN'])],
        component: AdminComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
          { path: 'products', loadComponent: () => import('./features/admin/products/product-list/product-list.component').then(m => m.ProductListComponent) },
          { path: 'products/new', loadComponent: () => import('./features/admin/products/product-form/product-form.component').then(m => m.ProductFormComponent) },
          { path: 'products/edit/:id', loadComponent: () => import('./features/admin/products/product-form/product-form.component').then(m => m.ProductFormComponent) },
          { path: 'warehouses', loadComponent: () => import('./features/admin/warehouses/warehouse-list/warehouse-list.component').then(m => m.WarehouseListComponent) },
          { path: 'warehouses/new', loadComponent: () => import('./features/admin/warehouses/warehouse-form/warehouse-form.component').then(m => m.WarehouseFormComponent) },
          { path: 'warehouses/edit/:id', loadComponent: () => import('./features/admin/warehouses/warehouse-form/warehouse-form.component').then(m => m.WarehouseFormComponent) },
          { path: 'users', loadComponent: () => import('./features/admin/users/user-list/user-list.component').then(m => m.UserListComponent) },
          { path: 'users/new', loadComponent: () => import('./features/admin/users/user-form/user-form.component').then(m => m.UserFormComponent) }
        ]
      },
      {
        path: 'warehouse',
        canActivate: [roleGuard(['WAREHOUSE_MANAGER'])],
        component: WarehouseComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', loadComponent: () => import('./features/warehouse/dashboard/dashboard.component').then(m => m.DashboardComponent) },
          { path: 'inventory', loadComponent: () => import('./features/warehouse/inventory/inventory-list/inventory-list.component').then(m => m.InventoryListComponent) },
          { path: 'movements', loadComponent: () => import('./features/warehouse/movement/movement-list/movement-list.component').then(m => m.MovementListComponent) },
        ]
      },
      {
        path: 'client',
        canActivate: [roleGuard(['CLIENT'])],
        loadComponent: () => import('./features/client/client.component').then(m => m.ClientComponent)
      },
    ]
  }
];
