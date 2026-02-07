import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';
// 1. On récupère la "feature" complète (la tranche du gâteau)
export const selectProductState = createFeatureSelector<ProductState>('products');
// 2. On découpe les parts (Selectors individuels)
export const selectProductItems = createSelector(
  selectProductState,
  (state) => state.items
);
export const selectProductLoading = createSelector(
  selectProductState,
  (state) => state.loading
);
export const selectProductError = createSelector(
  selectProductState,
  (state) => state.error
);
export const selectProductQuery = createSelector(
  selectProductState,
  (state) => state.query
);
export const selectProductTotals = createSelector(
  selectProductState,
  (state) => ({
    total: state.totalElements,
    pages: state.totalPages,
    page: state.query.page,
    size: state.query.size
  })
);
