export type PurchaseOrderStatus = 'DRAFT' | 'APPROVED' | 'PARTIALLY_RECEIVED' | 'RECEIVED' | 'CANCELED';
export interface PurchaseOrderLine {
    id: string;
    productId: string;
    productSku: string;
    productName: string;
    quantityOrdered: number;
    quantityReceived: number;
    unitPrice: number;
}
export interface PurchaseOrder {
    id: string;
    supplierId: string;
    supplierName: string;
    status: PurchaseOrderStatus;
    orderLines: PurchaseOrderLine[];
    createdAt: string;
}
export interface CreatePurchaseOrderRequest {
    supplierId: string;
    orderLines: {
        productId: string;
        quantityOrdered: number;
        unitPrice: number;
    }[];
}
export interface ReceivePurchaseOrderRequest {
    warehouseId: string;
    receivedLines: {
        purchaseOrderLineId: string;
        quantityReceived: number;
    }[];
    referenceDocument: string;
}
export interface Supplier {
    id: string;
    name: string;
    email?: string;
    phone?: string;
}
