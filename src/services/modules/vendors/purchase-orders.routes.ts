import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/vendors/purchase-orders`;

export const vendorPurchaseOrdersRoutes = {
  // Get vendor's purchase orders
  getAll: (params?: {
    status?: string[];
    page?: number;
    limit?: number;
  }) => `${BASE_PATH}${buildQueryString(params)}`,
  
  // Get PO details
  getById: (poId: string) => `${BASE_PATH}/${poId}`,
  
  // Accept purchase order
  accept: (poId: string) => `${BASE_PATH}/${poId}/accept`,
  
  // Reject purchase order
  reject: (poId: string) => `${BASE_PATH}/${poId}/reject`,
  
  // Submit milestone completion
  submitMilestoneCompletion: (poId: string, milestoneId: string) =>
    `${BASE_PATH}/${poId}/milestones/${milestoneId}/complete`,
  
  // Submit invoice
  submitInvoice: (poId: string) => `${BASE_PATH}/${poId}/invoices`,
  
  // Get vendor PO statistics
  stats: `${BASE_PATH}/stats`,
};
