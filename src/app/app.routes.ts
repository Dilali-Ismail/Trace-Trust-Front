import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { roleGuard } from './core/guards/role.guard';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },

      // Routes protégées par rôle
      {
        path: 'admin',
        canActivate: [roleGuard(['ADMIN'])],
        loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent)
      },
      {
        path: 'warehouse',
        canActivate: [roleGuard(['WAREHOUSE_MANAGER'])],
        loadComponent: () => import('./features/warehouse/warehouse.component').then(m => m.WarehouseComponent)
      },
      {
        path: 'client',
        canActivate: [roleGuard(['CLIENT'])],
        loadComponent: () => import('./features/client/client.component').then(m => m.ClientComponent)
      },
    ]
  }
];
