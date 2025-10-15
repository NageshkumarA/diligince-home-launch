import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/purchase-orders`;

export const purchaseOrdersRoutes = {
  // Get active purchase orders
  getActive: (params?: { 
    status?: string; 
    vendorId?: string;
    page?: number; 
    limit?: number;
    sortBy?: string;
    order?: string;
  }) => `${BASE_PATH}/active${buildQueryString(params)}`,
  
  // Get purchase order by ID
  getById: (orderId: string) => `${BASE_PATH}/${orderId}`,
  
  // Get all purchase orders
  getAll: (params?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }) => `${BASE_PATH}${buildQueryString(params)}`,
  
  // Create purchase order
  create: `${BASE_PATH}`,
  
  // Update purchase order
  update: (orderId: string) => `${BASE_PATH}/${orderId}`,
  
  // Cancel purchase order
  cancel: (orderId: string) => `${BASE_PATH}/${orderId}/cancel`,
  
  // Update milestone
  updateMilestone: (orderId: string, milestoneId: string) => 
    `${BASE_PATH}/${orderId}/milestones/${milestoneId}`,
};
