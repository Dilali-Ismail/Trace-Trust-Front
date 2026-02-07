import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProductService } from '../../../features/admin/services/product.service';
import { ProductActions } from './product.actions';
@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  // 1. Effect pour charger les produits
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      // a) Écoute l'action 'Load Products'
      ofType(ProductActions.loadProducts),

      // b) Appelle le service
      switchMap(({ query }) =>
        this.productService.list(query).pipe(
          // c) Succès : On renvoie l'action de succès avec les données
          map((response) =>
            ProductActions.loadProductsSuccess({
              items: response.content,         // Adapter si votre API renvoie autre chose (ex: response.data)
              totalElements: response.totalElements,
              totalPages: response.totalPages
            })
          ),

          // d) Erreur : On renvoie l'action d'erreur
          catchError((error) =>
            of(ProductActions.loadProductsFailure({
              error: {
                status: error.status,
                message: error.message
              }
            }))
          )
        )
      )
    )
  );
  // 2. Effect "Trigger" : Quand on change la requête, on relance le chargement
  // (Optionnel : si on veut que setQuery déclenche automatiquement le load)
  // Pour l'instant on va gérer ça dans le composant ou ici.
  // Faisons simple : pas d'effet pour setQuery ici, le composant dispatchera LoadProducts lu-même
  // OU BIEN on fait un effet qui écoute SetQuery et lance LoadProducts avec le selecteur (plus avancé).
  // Restons simple pour cette étape.
}
