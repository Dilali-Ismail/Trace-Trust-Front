export interface Product {
    id?: string;
    sku: string;
    name: string;
    category: string;
    costPrice: number;
    active: boolean;
    imageUrl?: string;
}

export interface ProductQuery {
  page: number;
  size: number;
  sort: string;      // ex: 'name,asc'
  search: string;
  category: string;  // 'all' ou ID
  active: boolean;
}
// État initial par défaut
export const DEFAULT_PRODUCT_QUERY: ProductQuery = {
  page: 0,
  size: 10,
  sort: 'name,asc',
  search: '',
  category: 'all',
  active: true
};
