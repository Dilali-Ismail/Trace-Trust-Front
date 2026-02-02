import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/product.models'; // Assurez-vous que ce chemin est bon
import { ProductQuery } from '../../models/product-query.model';
export const ProductActions = createActionGroup({
  source: 'Home Page Products', // Le namespace de nos actions
  events: {
    // 1. L'utilisateur ou l'app demande le chargement
    'Load Products': props<{ query: ProductQuery }>(),

    // 2. L'utilisateur change un filtre (search, page, etc...)
    'Set Query': props<{ query: Partial<ProductQuery> }>(),

    // 3. Réponse de l'API (Succès)
    'Load Products Success': props<{
      items: Product[],
      totalElements: number,
      totalPages: number
    }>(),

    // 4. Réponse de l'API (Echec)
    'Load Products Failure': props<{ error: any }>(),

    // 5. Reset (Optionnel)
    'Reset Query': emptyProps()
  }
});
