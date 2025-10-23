// Purchase Order type definitions

export type POStatus =
  | 'draft'
  | 'pending_approval'
  | 'approved'
  | 'rejected'
  | 'sent_to_vendor'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  title: string;
  vendorId: string;
  vendorName: string;
  quotationId?: string;
  status: POStatus;
  totalValue: number;
  currency: string;
  startDate: string;
  expectedCompletionDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  specifications?: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  amount: number;
  percentage: number;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  deliverables?: string;
  completionDate?: string;
  proofOfWork?: string[];
}

export interface AcceptanceCriteria {
  id: string;
  criteria: string;
  priority: 'high' | 'medium' | 'low';
  verificationMethod: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: 'draft' | 'submitted' | 'approved' | 'paid' | 'rejected';
  milestoneId?: string;
  description: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
  notes?: string;
  submissionDate?: string;
  approvalDate?: string;
  paymentDate?: string;
}

export interface PurchaseOrderDetail extends PurchaseOrder {
  deliverables: Deliverable[];
  milestones: Milestone[];
  acceptanceCriteria: AcceptanceCriteria[];
  invoices: Invoice[];
  terms: string;
  notes?: string;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    uploadedAt: string;
  }>;
}

export interface PurchaseOrderListResponse {
  success: boolean;
  data: {
    purchaseOrders: PurchaseOrder[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface PurchaseOrderActivity {
  id: string;
  action: string;
  description: string;
  performedBy: string;
  performedAt: string;
  metadata?: Record<string, any>;
}
