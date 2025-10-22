import { PaginationParams, PaginationResponse } from '../../core/common.types';

// ============= Status Types =============
export type POStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'approved' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export type MilestoneStatus = 
  | 'pending' 
  | 'in_progress' 
  | 'completed' 
  | 'overdue';

export type InvoiceStatus = 
  | 'draft' 
  | 'pending' 
  | 'paid' 
  | 'overdue' 
  | 'cancelled';

export type DeliveryStatus = 
  | 'not_started' 
  | 'in_transit' 
  | 'partially_delivered' 
  | 'delivered' 
  | 'delayed';

// ============= Main Purchase Order Interface =============
export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  vendorId: string;
  vendorName: string;
  requirementId: string;
  quotationId: string;
  
  // Financial details
  status: POStatus;
  amount: number;
  taxPercentage: number;
  taxAmount: number;
  totalValue: number;
  currency: string;
  paymentTerms: string;
  
  // Project details
  projectTitle: string;
  scopeOfWork: string;
  specialInstructions?: string;
  
  // Timeline
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  completedAt?: string;
  
  // Progress tracking
  completionPercentage: number;
  milestonesCompleted: number;
  milestonesPending: number;
  totalMilestones: number;
  
  // Summary counts
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
}

// ============= Detailed Purchase Order (with relations) =============
export interface PurchaseOrderDetail extends PurchaseOrder {
  vendor: VendorInfo;
  requirement: RequirementInfo;
  quotation: QuotationInfo;
  deliverables: Deliverable[];
  paymentMilestones: PaymentMilestone[];
  acceptanceCriteria: AcceptanceCriteria[];
  invoices: Invoice[];
  deliveryTracking: DeliveryTracking;
  documents: Document[];
  activityLog: ActivityLog[];
  approvalWorkflow: ApprovalWorkflow;
}

// ============= Related Entity Types =============
export interface VendorInfo {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  rating: number;
}

export interface RequirementInfo {
  id: string;
  title: string;
  category: string;
  priority: string;
}

export interface QuotationInfo {
  id: string;
  quoteNumber: string;
  amount: number;
  validUntil: string;
}

export interface Deliverable {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  status: 'pending' | 'in_progress' | 'delivered';
}

export interface PaymentMilestone {
  id: string;
  description: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: MilestoneStatus;
  completedAt?: string;
  proofDocuments?: Document[];
  invoiceId?: string;
}

export interface AcceptanceCriteria {
  id: string;
  criteria: string;
  status: 'pending' | 'met' | 'failed';
  verifiedAt?: string;
  verifiedBy?: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  milestoneId: string;
  milestoneName: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  issuedAt: string;
  dueDate: string;
  paidAt?: string;
  paymentMethod?: string;
  paymentReference?: string;
  documents: Document[];
}

export interface DeliveryTracking {
  status: DeliveryStatus;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  delayReason?: string;
  currentLocation?: string;
  estimatedArrival?: string;
  trackingNumber?: string;
  carrier?: string;
  events: DeliveryEvent[];
  proofOfDelivery?: Document;
}

export interface DeliveryEvent {
  id: string;
  timestamp: string;
  status: string;
  location: string;
  description: string;
  updatedBy: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  size: number;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  performedByName: string;
  details: string;
  metadata?: Record<string, any>;
}

export interface ApprovalWorkflow {
  currentStep: number;
  totalSteps: number;
  approvers: Array<{
    id: string;
    name: string;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    comments?: string;
    timestamp?: string;
  }>;
}

// ============= Request Types =============
export interface CreatePORequest {
  quotationId: string;
  projectTitle: string;
  scopeOfWork: string;
  specialInstructions?: string;
  startDate: string;
  endDate: string;
  paymentTerms: string;
  deliverables: Array<{
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }>;
  paymentMilestones: Array<{
    description: string;
    percentage: number;
    dueDate: string;
  }>;
  acceptanceCriteria: Array<{
    criteria: string;
  }>;
}

export interface UpdatePORequest {
  projectTitle?: string;
  scopeOfWork?: string;
  specialInstructions?: string;
  startDate?: string;
  endDate?: string;
  paymentTerms?: string;
  deliverables?: Array<{
    id?: string;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
  }>;
  paymentMilestones?: Array<{
    id?: string;
    description: string;
    percentage: number;
    dueDate: string;
  }>;
  acceptanceCriteria?: Array<{
    id?: string;
    criteria: string;
  }>;
}

export interface CancelPORequest {
  reason: string;
  cancelledBy: string;
}

export interface ApprovePORequest {
  comments?: string;
}

export interface RejectPORequest {
  reason: string;
}

export interface MilestoneUpdateRequest {
  status?: MilestoneStatus;
  completedAt?: string;
  notes?: string;
}

export interface InvoiceCreateRequest {
  milestoneId: string;
  invoiceNumber: string;
  issuedAt: string;
  dueDate: string;
}

export interface InvoiceUpdateRequest {
  status?: InvoiceStatus;
  dueDate?: string;
}

export interface MarkInvoicePaidRequest {
  paidAt: string;
  paymentMethod: string;
  paymentReference: string;
}

export interface DeliveryUpdateRequest {
  status: DeliveryStatus;
  location?: string;
  description: string;
  estimatedArrival?: string;
  delayReason?: string;
}

export interface ExportXLSXRequest {
  orderIds?: string[];
  status?: POStatus;
  dateFrom?: string;
  dateTo?: string;
}

// ============= Response Types =============
export interface POListResponse {
  success: boolean;
  data: PurchaseOrder[];
  pagination: PaginationResponse;
  summary: {
    totalOrders: number;
    totalValue: number;
    activeOrders: number;
    completedOrders: number;
  };
}

export interface PODetailResponse {
  success: boolean;
  data: PurchaseOrderDetail;
}

export interface MilestoneListResponse {
  success: boolean;
  data: PaymentMilestone[];
}

export interface InvoiceListResponse {
  success: boolean;
  data: Invoice[];
}

export interface DeliveryTrackingResponse {
  success: boolean;
  data: DeliveryTracking;
}

export interface ActivityLogResponse {
  success: boolean;
  data: ActivityLog[];
}

// ============= Query Params =============
export interface POListParams extends PaginationParams {
  status?: POStatus;
  vendorId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  minAmount?: number;
  maxAmount?: number;
}
