export type OrderStatus = 'CREATED' | 'RESERVED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export interface Backorder {
    salesOrderLineId: string;
    productSku: string;
    quantityPending: number;
    reason: string;
}
export interface OrderItem {
    productId: string;
    productName?: string;
    productSku?: string;
    quantity: number;
    unitPrice: number;
}
export interface SalesOrder {
    id: string;
    orderNumber?: string;
    status: OrderStatus;
    createdAt: string;
    orderLines: OrderItem[];
    backorders: Backorder[]; 
    totalAmount?: number;
}
export interface CreateSalesOrderRequest {
    orderLines: {
        productId: string;
        quantity: number;
        unitPrice: number;
    }[];
}
