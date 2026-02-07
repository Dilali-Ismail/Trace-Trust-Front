import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/product.models';
import { ProductQuery } from '../../models/product-query.model';
export const ProductActions = createActionGroup({
  source: 'Home Page Products',
  events: {

    'Load Products': props<{ query: ProductQuery }>(),

    'Set Query': props<{ query: Partial<ProductQuery> }>(),

    'Load Products Success': props<{
      items: Product[],
      totalElements: number,
      totalPages: number
    }>(),

    'Load Products Failure': props<{ error: any }>(),

    'Reset Query': emptyProps()
  }
});
