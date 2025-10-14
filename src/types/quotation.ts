export type QuotationStatus = 
  | 'pending_review'
  | 'under_evaluation'
  | 'awaiting_clarification'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'withdrawn';

export type DocumentType = 'proposal' | 'technical_spec' | 'pricing' | 'compliance' | 'other';

export type RecommendationType = 'top_pick' | 'best_value' | 'fastest_delivery' | 'highest_rated' | 'best_match' | null;

export type RiskLevel = 'low' | 'medium' | 'high';

export interface QuotationDocument {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  uploadedAt: string;
  size: number;
}

export interface AIEvaluation {
  overallScore: number;
  priceScore: number;
  deliveryScore: number;
  ratingScore: number;
  specializationScore: number;
  performanceScore: number;
  recommendation: RecommendationType;
  reasoning: string;
  riskLevel: RiskLevel;
  strengths?: string[];
  concerns?: string[];
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  requirementId: string;
  requirementTitle: string;
  vendorId: string;
  vendorName: string;
  vendorRating: number;
  quotedAmount: number;
  currency: string;
  paymentTerms: string;
  submittedDate: string;
  validUntil: string;
  responseTime: string;
  deliveryTimeWeeks: number;
  proposalSummary: string;
  detailedDescription?: string;
  termsAndConditions?: string;
  warrantyPeriod?: string;
  status: QuotationStatus;
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  documents: QuotationDocument[];
  aiEvaluation?: AIEvaluation;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationComparison {
  requirementId: string;
  requirementTitle: string;
  quotations: Quotation[];
  lowestPrice: {
    quotationId: string;
    amount: number;
    savings: number;
    savingsPercentage: number;
  };
  fastestDelivery: {
    quotationId: string;
    weeks: number;
    difference: number;
  };
  highestRated: {
    quotationId: string;
    vendorName: string;
    rating: number;
  };
}

export interface PaginationData {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FilterOption {
  key: string;
  value: string;
  color?: string;
}

export interface QuotationListResponse {
  success: boolean;
  data: {
    quotations: Quotation[];
    pagination: PaginationData;
    filters: {
      applied: Record<string, any>;
      available: Record<string, FilterOption[]>;
    };
  };
}

export interface ListQueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  vendorId?: string;
  requirementId?: string;
  minAmount?: number;
  maxAmount?: number;
  status?: QuotationStatus | 'all';
  fromDate?: string;
  toDate?: string;
}

export interface CompareQuotationsRequest {
  quotationIds: string[];
  requirementId?: string;
}

export interface AnalyzeQuotationsRequest {
  requirementId: string;
  quotationIds: string[];
  priorities?: {
    price: number;
    delivery: number;
    quality: number;
    vendor_rating: number;
  };
}

export interface AnalyzeQuotationsResponse {
  success: boolean;
  data: {
    requirementId: string;
    requirementTitle: string;
    analysisDate: string;
    evaluations: Record<string, AIEvaluation>;
    recommendation: {
      topPick: {
        quotationId: string;
        vendorName: string;
        reason: string;
      };
      bestValue: {
        quotationId: string;
        vendorName: string;
        reason: string;
      };
    };
    summary: {
      totalQuotationsAnalyzed: number;
      averagePrice: number;
      priceRange: {
        min: number;
        max: number;
        spread: number;
      };
      averageDelivery: number;
      deliveryRange: {
        min: number;
        max: number;
      };
    };
  };
}

export interface BulkOperationResult {
  quotationId: string;
  success: boolean;
  quotationNumber: string;
  error?: string;
}

export interface BulkOperationResponse {
  success: boolean;
  data: {
    successCount: number;
    failedCount: number;
    results: BulkOperationResult[];
  };
  message: string;
}

export interface ApproveQuotationRequest {
  comments?: string;
}

export interface RejectQuotationRequest {
  reason: 'pricing_too_high' | 'timeline_unacceptable' | 'requirements_not_met' | 'other';
  comments?: string;
}

export interface ClarificationRequest {
  message: string;
}

export interface BulkApproveRequest {
  quotationIds: string[];
  comments?: string;
}

export interface BulkRejectRequest {
  quotationIds: string[];
  reason: 'pricing_too_high' | 'timeline_unacceptable' | 'requirements_not_met' | 'other';
  comments?: string;
}
