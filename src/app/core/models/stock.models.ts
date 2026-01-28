export interface Stock {
  inventoryId: string;
  productId: string;
  productSku: string;
  warehouseId: string;
  warehouseCode: string;
  quantity_hand: number;
  quantity_reserved: number;
  available: number;
}

export type MovementType = 'INBOUND' | 'OUTBOUND' | 'ADJUSTMENT';
export interface StockMovement {
  id: string;
  productId: string;
  productSku: string;
  warehouseId: string;
  warehouseName: string;
  type: MovementType;
  quantity: number;
  referenceDocument?: string;
  occurredAt: string;
}
export interface CreateMovementRequest {
  warehouseId: string;
  productId: string;
  quantity: number;
  type: MovementType;
  referenceDocument?: string;
}
