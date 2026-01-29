export type OrderStatus = 'CREATED' | 'RESERVED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export interface OrderItem {
    productId: string;
    productName?: string;
    quantity: number;
    unitPrice: number;
}
export interface SalesOrder {
    id: string;
    orderNumber?: string;
    status: OrderStatus;
    createdAt: string;
    orderLines: OrderItem[];
    totalAmount?: number;
}
export interface CreateSalesOrderRequest {
    orderLines: {
        productId: string;
        quantity: number;
        unitPrice: number;
    }[];
}
