import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/dashboard`;

export const dashboardRoutes = {
  // Get dashboard statistics
  stats: `${BASE_PATH}/stats`,
  
  // Get procurement analytics
  analytics: `${BASE_PATH}/analytics`,
  
  // Get budget overview
  budget: `${BASE_PATH}/budget`,
  
  // Get vendor performance rankings
  vendorPerformance: `${BASE_PATH}/vendors/performance`,
  
  // Get pending approvals for current user
  pendingApprovals: `${API_BASE_PATH}/industry/approvals/pending`,
  
  // Get active requirements
  activeRequirements: `${API_BASE_PATH}/industry/requirements?status=active`,
  
  // Get active purchase orders
  activePurchaseOrders: `${API_BASE_PATH}/industry/purchase-orders?status=active,in_progress`,
  
  // Legacy endpoint function
  getStats: (params?: { period?: string; startDate?: string; endDate?: string }) =>
    `${BASE_PATH}/stats${buildQueryString(params)}`,
  
  // Legacy endpoints (kept for backward compatibility)
  getAll: (queryParams: any) => 
    `${API_BASE_PATH}/get_service_requests?${buildQueryString(queryParams)}`,
  getById: (id: any) => `${API_BASE_PATH}/request/details/${id}`,
  create: `${API_BASE_PATH}/request/create`,
};
