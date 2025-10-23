import apiService from '../../core/api.service';
import { vendorRFQsRoutes } from './rfqs.routes';
import type {
  VendorRFQListResponse,
  RFQDetail,
  VendorRFQStats,
  VendorRFQBrowseFilters,
} from '@/types/vendor';

class VendorRFQsService {
  /**
   * Browse available RFQs
   */
  async getBrowseRFQs(filters?: VendorRFQBrowseFilters): Promise<VendorRFQListResponse> {
    const response = await apiService.get<VendorRFQListResponse>(
      vendorRFQsRoutes.browse(filters)
    );
    return response;
  }

  /**
   * Get RFQ details
   */
  async getRFQDetails(rfqId: string): Promise<RFQDetail> {
    const response = await apiService.get<{ success: boolean; data: RFQDetail }>(
      vendorRFQsRoutes.getById(rfqId)
    );
    return response.data;
  }

  /**
   * Get RFQs invited to (vendor received invitation)
   */
  async getInvitedRFQs(filters?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<VendorRFQListResponse> {
    const response = await apiService.get<VendorRFQListResponse>(
      vendorRFQsRoutes.invited(filters)
    );
    return response;
  }

  /**
   * Get RFQ statistics for vendor dashboard
   */
  async getRFQStats(): Promise<VendorRFQStats> {
    const response = await apiService.get<{ success: boolean; data: VendorRFQStats }>(
      vendorRFQsRoutes.stats
    );
    return response.data;
  }
}

export const vendorRFQsService = new VendorRFQsService();
export default vendorRFQsService;
