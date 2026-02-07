import { createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product.models';
import { ProductQuery, DEFAULT_PRODUCT_QUERY } from '../../models/product-query.model';
import { ProductActions } from './product.actions';
// 1. Définition de la forme de notre State
export interface ProductState {
  items: Product[];
  totalElements: number;
  totalPages: number;
  loading: boolean;
  error: any | null;
  query: ProductQuery;
}
// 2. État Initial
export const initialState: ProductState = {
  items: [],
  totalElements: 0,
  totalPages: 0,
  loading: false, // Pas de chargement au démarrage
  error: null,
  query: DEFAULT_PRODUCT_QUERY
};
// 3. Le Reducer
export const productReducer = createReducer(
  initialState,
  // 🔄 Quand on lance un chargement ou qu'on change un filtre
  on(ProductActions.loadProducts, (state, { query }) => ({
    ...state,
    loading: true,
    error: null,
    query: { ...state.query, ...query } // Mise à jour de la requête
    // Note: on garde les items précédents pendant le chargement pour éviter l'écran blanc
  })),
  on(ProductActions.setQuery, (state, { query }) => ({
    ...state,
    query: { ...state.query, ...query }
    // Note : On ne passe pas loading=true ici, car setQuery déclenchera loadProducts via un Effect plus tard
  })),
  // ✅ Succès API
  on(ProductActions.loadProductsSuccess, (state, { items, totalElements, totalPages }) => ({
    ...state,
    items,
    totalElements,
    totalPages,
    loading: false,
    error: null
  })),
  // ❌ Erreur API
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // 🧹 Reset
  on(ProductActions.resetQuery, () => initialState)
);
