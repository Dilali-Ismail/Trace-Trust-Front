import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken();

  console.log('--- INTERCEPTOR CHECK ---');
  console.log('URL de la requête :', req.url);
  console.log('Token présent ? :', !!token);

  const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/register');

  // On clone la requête pour y ajouter le header Authorization uniquement si ce n'est pas une requête d'auth
  if (token && !isAuthRequest) {
     console.log('Injection du Token Bearer...');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
