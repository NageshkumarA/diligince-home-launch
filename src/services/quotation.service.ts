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
    const response = await apiService.get(
      apiRoutes.industry.quotations.pending(params)
    );
    return response.data;
  }

  /**
   * Get approved quotations
   */
  async getApproved(params?: ListQueryParams): Promise<QuotationListResponse> {
    const response = await apiService.get(apiRoutes.industry.quotations.approved(params));
    return response.data;
  }

  async getAll(params?: ListQueryParams): Promise<QuotationListResponse> {
    const response = await apiService.get(apiRoutes.industry.quotations.all(params));
    return response.data;
  }

  async getById(quotationId: string): Promise<Quotation> {
    const response = await apiService.get(apiRoutes.industry.quotations.getById(quotationId));
    return response.data.data;
  }

  async approve(quotationId: string, data: ApproveQuotationRequest): Promise<Quotation> {
    const response = await apiService.post(apiRoutes.industry.quotations.approve(quotationId), data);
    return response.data.data;
  }

  async reject(quotationId: string, data: RejectQuotationRequest): Promise<Quotation> {
    const response = await apiService.post(apiRoutes.industry.quotations.reject(quotationId), data);
    return response.data.data;
  }

  async requestClarification(quotationId: string, data: ClarificationRequest): Promise<void> {
    await apiService.post(apiRoutes.industry.quotations.clarification(quotationId), data);
  }

  async compare(data: CompareQuotationsRequest): Promise<QuotationComparison> {
    const response = await apiService.post(apiRoutes.industry.quotations.compare, data);
    return response.data.data;
  }

  async analyze(data: AnalyzeQuotationsRequest): Promise<AnalyzeQuotationsResponse> {
    const response = await apiService.post(apiRoutes.industry.quotations.analyze, data);
    return response.data;
  }

  async bulkApprove(data: BulkApproveRequest): Promise<BulkOperationResponse> {
    const response = await apiService.post(apiRoutes.industry.quotations.bulkApprove, data);
    return response.data;
  }

  async bulkReject(data: BulkRejectRequest): Promise<BulkOperationResponse> {
    const response = await apiService.post(apiRoutes.industry.quotations.bulkReject, data);
    return response.data;
  }

  async exportToXLSX(params?: ListQueryParams): Promise<Blob> {
    const response = await apiService.get(apiRoutes.industry.quotations.export.xlsx(params), { responseType: 'blob' });
    return response.data;
  }

  async exportToCSV(params?: ListQueryParams): Promise<Blob> {
    const response = await apiService.get(apiRoutes.industry.quotations.export.csv(params), { responseType: 'blob' });
    return response.data;
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
