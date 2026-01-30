export type ShipmentStatus = 'PLANNED' | 'IN_TRANSIT' | 'DELIVERED';
export interface Shipment {
    id: string;
    salesOrderId: string;
    carrierId: string;
    carrierName: string;
    status: ShipmentStatus;
    trackingNumber: string;
    createdAt: string;
    shippedAt: string | null;
    deliveredAt: string | null;
}
export interface Carrier {
    id: string;
    name: string;
    active: boolean;
}
export interface CreateShipmentRequest {
    salesOrderId: string;
    carrierId: string;
    trackingNumber: string;
}
