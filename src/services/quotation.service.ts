import apiService from './api.service';
import { apiRoutes } from './api.routes';
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
} from '@/types/quotation';

class QuotationService {
  /**
   * Get pending quotations
   */
  async getPending(params?: ListQueryParams): Promise<QuotationListResponse> {
    const response = await apiService.get<QuotationListResponse>(
      apiRoutes.industry.quotations.pending(params)
    );
    return response;
  }

  /**
   * Get approved quotations
   */
  async getApproved(params?: ListQueryParams): Promise<QuotationListResponse> {
    const response = await apiService.get<QuotationListResponse>(apiRoutes.industry.quotations.approved(params));
    return response;
  }

  async getAll(params?: ListQueryParams): Promise<QuotationListResponse> {
    const response = await apiService.get<QuotationListResponse>(apiRoutes.industry.quotations.all(params));
    return response;
  }

  async getById(quotationId: string): Promise<Quotation> {
    const response = await apiService.get<{ success: boolean; data: Quotation }>(apiRoutes.industry.quotations.getById(quotationId));
    return response.data;
  }

  async approve(quotationId: string, data: ApproveQuotationRequest): Promise<Quotation> {
    const response = await apiService.post<{ success: boolean; data: Quotation }, ApproveQuotationRequest>(apiRoutes.industry.quotations.approve(quotationId), data);
    return response.data;
  }

  async reject(quotationId: string, data: RejectQuotationRequest): Promise<Quotation> {
    const response = await apiService.post<{ success: boolean; data: Quotation }, RejectQuotationRequest>(apiRoutes.industry.quotations.reject(quotationId), data);
    return response.data;
  }

  async requestClarification(quotationId: string, data: ClarificationRequest): Promise<void> {
    await apiService.post<{ success: boolean; message: string }, ClarificationRequest>(apiRoutes.industry.quotations.clarification(quotationId), data);
  }

  async compare(data: CompareQuotationsRequest): Promise<QuotationComparison> {
    const response = await apiService.post<{ success: boolean; data: QuotationComparison }, CompareQuotationsRequest>(apiRoutes.industry.quotations.compare, data);
    return response.data;
  }

  async analyze(data: AnalyzeQuotationsRequest): Promise<AnalyzeQuotationsResponse> {
    const response = await apiService.post<AnalyzeQuotationsResponse, AnalyzeQuotationsRequest>(apiRoutes.industry.quotations.analyze, data);
    return response;
  }

  async bulkApprove(data: BulkApproveRequest): Promise<BulkOperationResponse> {
    const response = await apiService.post<BulkOperationResponse, BulkApproveRequest>(apiRoutes.industry.quotations.bulkApprove, data);
    return response;
  }

  async bulkReject(data: BulkRejectRequest): Promise<BulkOperationResponse> {
    const response = await apiService.post<BulkOperationResponse, BulkRejectRequest>(apiRoutes.industry.quotations.bulkReject, data);
    return response;
  }

  async exportToXLSX(params?: ListQueryParams): Promise<Blob> {
    const response = await apiService.get<Blob>(apiRoutes.industry.quotations.export.xlsx(params), { responseType: 'blob' });
    return response;
  }

  async exportToCSV(params?: ListQueryParams): Promise<Blob> {
    const response = await apiService.get<Blob>(apiRoutes.industry.quotations.export.csv(params), { responseType: 'blob' });
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
