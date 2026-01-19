export interface Product {
    id?: string;
    sku: string; 
    name: string;
    category: string;
    costPrice: number;
    active: boolean;
    imageUrl?: string;
}
