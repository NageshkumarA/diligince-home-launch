import apiService from '../../core/api.service';
import { diligenceHubVendorsRoutes } from './vendors.routes';
import type { VendorListResponse, VendorSearchFilters, VendorListItem } from '@/types/vendor';

class DiligenceHubVendorsService {
  async searchVendors(filters?: VendorSearchFilters): Promise<VendorListResponse> {
    return apiService.get(diligenceHubVendorsRoutes.search(filters));
  }

  async getVendorById(vendorId: string): Promise<VendorListItem> {
    return apiService.get(diligenceHubVendorsRoutes.getById(vendorId));
  }

  async getSpecializations(): Promise<string[]> {
    return apiService.get(diligenceHubVendorsRoutes.getSpecializations());
  }

  async getLocations(): Promise<string[]> {
    return apiService.get(diligenceHubVendorsRoutes.getLocations());
  }
}

export const diligenceHubVendorsService = new DiligenceHubVendorsService();
export default diligenceHubVendorsService;
