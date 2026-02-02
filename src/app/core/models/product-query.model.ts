export interface  ProductQuery {
  page: number;
  size: number;
  sort: string;
  search: string;
  category: string;
  active: boolean;
}

export const DEFAULT_PRODUCT_QUERY: ProductQuery = {
  page: 0,
  size: 10,
  sort: 'name,asc',
  search: '',
  category: 'all',
  active: true
};
