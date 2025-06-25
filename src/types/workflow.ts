
export interface VendorQuote {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  quoteAmount: number;
  deliveryTimeWeeks: number;
  proposalSummary: string;
  submittedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  documents: string[];
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'in_progress' | 'completed';
  createdDate: string;
  terms: string;
}

export interface PaymentMilestone {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  status: 'pending' | 'released' | 'completed';
  dueDate?: string;
  releasedDate?: string;
  description: string;
}

export interface RetentionPayment {
  amount: number;
  percentage: number;
  releaseDate: string;
  status: 'locked' | 'available' | 'released';
  delayPeriodDays: number;
}

export interface WorkflowEvent {
  id: string;
  type: 'quote_submitted' | 'quote_accepted' | 'po_generated' | 'work_started' | 'milestone_completed' | 'work_completed' | 'payment_released';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
}

export interface ProjectWorkflow {
  id: string;
  requirementId: string;
  projectTitle: string;
  quotes: VendorQuote[];
  acceptedQuote?: VendorQuote;
  purchaseOrder?: PurchaseOrder;
  workStatus: 'not_started' | 'in_progress' | 'completed' | 'approved';
  paymentMilestones: PaymentMilestone[];
  retentionPayment: RetentionPayment;
  timeline: WorkflowEvent[];
  totalProjectValue: number;
}
