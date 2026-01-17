import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.role();
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    router.navigate(['/login']);
    return false;
  };
};
