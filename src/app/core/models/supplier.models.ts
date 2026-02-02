export interface Supplier {
  id?: string;
  name: string;
  contactInfo: string;
  active: boolean;
}

export interface CreateSupplierDTO {
  name: string;
  contactInfo: string;
}

export interface UpdateSupplierDTO {
  name?: string;
  contactInfo?: string;
  active?: boolean;
}
