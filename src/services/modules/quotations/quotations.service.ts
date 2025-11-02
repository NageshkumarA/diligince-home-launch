import apiService from '../../core/api.service';
import { quotationsRoutes } from './quotations.routes';
import type {
  Quotation,
  QuotationListResponse,
  QuotationComparison,
  ListQueryParams,
  CompareQuotationsRequest,
  AnalyzeQuotationsRequest,
  AnalyzeQuotationsResponse,
  ApproveQuotationRequest,
  RejectQuotationRequest,
  ClarificationRequest,
  BulkApproveRequest,
  BulkRejectRequest,
  BulkOperationResponse,
  QuotationActivity,
  ActivityResponse,
  QuotationsByRequirementResponse,
  ActionValidationResponse,
  QuotationDetail,
  EnhancedApproveQuotationRequest,
  EnhancedClarificationRequest,
} from '@/types/quotation';

class QuotationService {
  /**
   * Get pending quotations
   */
  async getPending(params?: ListQueryParams): Promise<QuotationListResponse> {
    const response = await apiService.get<QuotationListResponse>(
      quotationsRoutes.pending(params)
    );
    return response;
  }

  /**
   * Get approved quotations
   */
  async getApproved(params?: ListQueryParams): Promise<QuotationListResponse> {
    const response = await apiService.get<QuotationListResponse>(quotationsRoutes.approved(params));
    return response;
  }

  async getAll(params?: ListQueryParams): Promise<QuotationListResponse> {
    const response = await apiService.get<QuotationListResponse>(quotationsRoutes.all(params));
    return response;
  }

  async getById(quotationId: string): Promise<QuotationDetail> {
    const response = await apiService.get<{ success: boolean; data: QuotationDetail }>(quotationsRoutes.getById(quotationId));
    return response.data;
  }

  async approve(quotationId: string, data: ApproveQuotationRequest): Promise<Quotation> {
    const response = await apiService.post<{ success: boolean; data: Quotation }, ApproveQuotationRequest>(quotationsRoutes.approve(quotationId), data);
    return response.data;
  }

  async reject(quotationId: string, data: RejectQuotationRequest): Promise<Quotation> {
    const response = await apiService.post<{ success: boolean; data: Quotation }, RejectQuotationRequest>(quotationsRoutes.reject(quotationId), data);
    return response.data;
  }

  async requestClarification(quotationId: string, data: ClarificationRequest): Promise<void> {
    await apiService.post<{ success: boolean; message: string }, ClarificationRequest>(quotationsRoutes.clarification(quotationId), data);
  }

  async compare(data: CompareQuotationsRequest): Promise<QuotationComparison> {
    const response = await apiService.post<{ success: boolean; data: QuotationComparison }, CompareQuotationsRequest>(quotationsRoutes.compare, data);
    return response.data;
  }

  async analyze(data: AnalyzeQuotationsRequest): Promise<AnalyzeQuotationsResponse> {
    const response = await apiService.post<AnalyzeQuotationsResponse, AnalyzeQuotationsRequest>(quotationsRoutes.analyze, data);
    return response;
  }

  async bulkApprove(data: BulkApproveRequest): Promise<BulkOperationResponse> {
    const response = await apiService.post<BulkOperationResponse, BulkApproveRequest>(quotationsRoutes.bulkApprove, data);
    return response;
  }

  async bulkReject(data: BulkRejectRequest): Promise<BulkOperationResponse> {
    const response = await apiService.post<BulkOperationResponse, BulkRejectRequest>(quotationsRoutes.bulkReject, data);
    return response;
  }

  async exportToXLSX(params?: ListQueryParams): Promise<Blob> {
    const response = await apiService.get<Blob>(quotationsRoutes.export.xlsx(params), { responseType: 'blob' });
    return response;
  }

  async exportToCSV(params?: ListQueryParams): Promise<Blob> {
    const response = await apiService.get<Blob>(quotationsRoutes.export.csv(params), { responseType: 'blob' });
    return response;
  }

  /**
   * Get activity timeline for a quotation
   */
  async getActivity(quotationId: string): Promise<QuotationActivity[]> {
    const response = await apiService.get<ActivityResponse>(
      quotationsRoutes.activity(quotationId)
    );
    return response.data.activities;
  }

  /**
   * Get quotations by requirement ID
   */
  async getByRequirement(requirementId: string, params?: ListQueryParams): Promise<QuotationsByRequirementResponse> {
    const response = await apiService.get<QuotationsByRequirementResponse>(
      quotationsRoutes.byRequirement(requirementId, params)
    );
    return response;
  }

  /**
   * Download a specific document
   */
  async downloadDocument(quotationId: string, documentId: string): Promise<Blob> {
    const response = await apiService.get<Blob>(
      quotationsRoutes.downloadDocument(quotationId, documentId),
      { responseType: 'blob' }
    );
    return response;
  }

  /**
   * Validate if user can perform an action
   */
  async validateAction(quotationId: string, action: 'approve' | 'reject' | 'request_clarification'): Promise<ActionValidationResponse> {
    const response = await apiService.get<ActionValidationResponse>(
      quotationsRoutes.validateAction(quotationId, action)
    );
    return response;
  }

  /**
   * Helper function to download exported file
   */
  downloadFile(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

export const quotationService = new QuotationService();
export default quotationService;
