import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/vendors/rfqs`;

export const vendorRFQsRoutes = {
  // Browse available RFQs
  browse: (params?: {
    category?: string;
    status?: 'open' | 'closing_soon' | 'closed';
    minBudget?: number;
    maxBudget?: number;
    location?: string;
    page?: number;
    limit?: number;
  }) => `${BASE_PATH}/browse${buildQueryString(params)}`,
  
  // Get RFQ details
  getById: (rfqId: string) => `${BASE_PATH}/${rfqId}`,
  
  // Get RFQs invited to (vendor received invitation)
  invited: (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) => `${BASE_PATH}/invited${buildQueryString(params)}`,
  
  // Get RFQ statistics for vendor dashboard
  stats: `${BASE_PATH}/stats`,
};
