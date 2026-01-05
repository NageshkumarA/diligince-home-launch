import apiService from '../../core/api.service';
import { vendorRFQsRoutes } from './rfqs.routes';
import type {
  RFQBrowseResponse,
  RFQDetailResponse,
  RFQStatsResponse,
  RFQBrowseFilters,
  RFQDetailItem,
} from '@/types/rfq-browse';

class VendorRFQsService {
  /**
   * Browse available RFQs with filters
   */
  async getBrowseRFQs(filters?: RFQBrowseFilters): Promise<RFQBrowseResponse> {
    const response = await apiService.get<RFQBrowseResponse>(
      vendorRFQsRoutes.browse(filters)
    );
    return response;
  }

  /**
   * Get RFQ details
   */
  async getRFQDetails(rfqId: string): Promise<RFQDetailItem> {
    const response = await apiService.get<RFQDetailResponse>(
      vendorRFQsRoutes.getById(rfqId)
    );
    return response.data;
  }

  /**
   * Get RFQ statistics for vendor dashboard
   */
  async getRFQStats(): Promise<RFQStatsResponse> {
    const response = await apiService.get<RFQStatsResponse>(
      vendorRFQsRoutes.stats
    );
    return response;
  }

  /**
   * Save/bookmark an RFQ
   */
  async saveRFQ(rfqId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiService.post<{ success: boolean; message: string }, Record<string, never>>(
      vendorRFQsRoutes.save(rfqId),
      {}
    );
    return response;
  }

  /**
   * Remove RFQ from saved list
   */
  async unsaveRFQ(rfqId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiService.remove<{ success: boolean; message: string }>(
      vendorRFQsRoutes.save(rfqId)
    );
    return response;
  }
}

export const vendorRFQsService = new VendorRFQsService();
export default vendorRFQsService;
