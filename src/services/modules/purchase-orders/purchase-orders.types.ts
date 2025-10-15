// Purchase Orders module types
export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  vendorId: string;
  status: string;
  amount: number;
  createdAt: string;
}
