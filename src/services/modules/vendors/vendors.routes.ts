import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/vendors`;

export const vendorsRoutes = {
  // Get top performing vendors
  getTopPerformers: (params?: { 
    limit?: number; 
    sortBy?: string;
    category?: string;
  }) => `${BASE_PATH}/top-performers${buildQueryString(params)}`,
  
  // Get vendor performance details
  getPerformance: (vendorId: string) => `${BASE_PATH}/${vendorId}/performance`,
  
  // Get all vendors
  getAll: (params?: {
    category?: string;
    rating?: number;
    page?: number;
    limit?: number;
  }) => `${BASE_PATH}${buildQueryString(params)}`,
  
  // Get vendor details
  getById: (vendorId: string) => `${BASE_PATH}/${vendorId}`,
  
  // Rate a vendor
  rateVendor: (vendorId: string) => `${BASE_PATH}/${vendorId}/rate`,
};
