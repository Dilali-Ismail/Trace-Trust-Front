import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient ,withInterceptors ,  withFetch  } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './core/store/products/product.reducer'; // votre chemin
import { ProductEffects } from './core/store/products/product.effects';
import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(withFetch() , withInterceptors([jwtInterceptor])),

     provideStore({
      // On associe la clé 'products' à notre reducer
      products: productReducer
    }),
    // 🚀 2. Enregistrement des Effects
    provideEffects([ProductEffects]),
    // 🚀 3. DevTools (pour le plugin Chrome Redux DevTools)
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })

    ]



};
