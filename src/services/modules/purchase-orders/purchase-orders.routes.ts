import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/purchase-orders`;

export const purchaseOrdersRoutes = {
  // ============= List Endpoints (Status-based) =============
  getActive: (params?: { 
    status?: string; 
    vendorId?: string;
    page?: number; 
    limit?: number;
    sortBy?: string;
    order?: string;
  }) => `${BASE_PATH}/active${buildQueryString(params)}`,
  
  getPending: (params?: {
    vendorId?: string;
    page?: number;
    limit?: number;
  }) => `${BASE_PATH}/pending${buildQueryString(params)}`,
  
  getInProgress: (params?: {
    vendorId?: string;
    page?: number;
    limit?: number;
  }) => `${BASE_PATH}/in-progress${buildQueryString(params)}`,
  
  getCompleted: (params?: {
    vendorId?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }) => `${BASE_PATH}/completed${buildQueryString(params)}`,
  
  getAll: (params?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }) => `${BASE_PATH}${buildQueryString(params)}`,
  
  // ============= Single PO Operations =============
  getById: (orderId: string) => `${BASE_PATH}/${orderId}`,
  
  create: `${BASE_PATH}`,
  
  update: (orderId: string) => `${BASE_PATH}/${orderId}`,
  
  cancel: (orderId: string) => `${BASE_PATH}/${orderId}/cancel`,
  
  // ============= Approval Workflow =============
  approve: (orderId: string) => `${BASE_PATH}/${orderId}/approve`,
  
  reject: (orderId: string) => `${BASE_PATH}/${orderId}/reject`,
  
  // ============= Milestone Operations =============
  getMilestones: (orderId: string) => `${BASE_PATH}/${orderId}/milestones`,
  
  getMilestoneById: (orderId: string, milestoneId: string) => 
    `${BASE_PATH}/${orderId}/milestones/${milestoneId}`,
  
  updateMilestone: (orderId: string, milestoneId: string) => 
    `${BASE_PATH}/${orderId}/milestones/${milestoneId}`,
  
  markMilestoneComplete: (orderId: string, milestoneId: string) => 
    `${BASE_PATH}/${orderId}/milestones/${milestoneId}/mark-complete`,
  
  uploadMilestoneProof: (orderId: string, milestoneId: string) => 
    `${BASE_PATH}/${orderId}/milestones/${milestoneId}/upload-proof`,
  
  // ============= Invoice Operations =============
  getInvoices: (orderId: string) => `${BASE_PATH}/${orderId}/invoices`,
  
  getInvoiceById: (orderId: string, invoiceId: string) => 
    `${BASE_PATH}/${orderId}/invoices/${invoiceId}`,
  
  createInvoice: (orderId: string) => `${BASE_PATH}/${orderId}/invoices`,
  
  updateInvoice: (orderId: string, invoiceId: string) => 
    `${BASE_PATH}/${orderId}/invoices/${invoiceId}`,
  
  markInvoicePaid: (orderId: string, invoiceId: string) => 
    `${BASE_PATH}/${orderId}/invoices/${invoiceId}/mark-paid`,
  
  exportInvoicePDF: (orderId: string, invoiceId: string) => 
    `${BASE_PATH}/${orderId}/invoices/${invoiceId}/export/pdf`,
  
  // ============= Delivery Tracking =============
  getDeliveryTracking: (orderId: string) => `${BASE_PATH}/${orderId}/delivery`,
  
  getDeliveryTimeline: (orderId: string) => `${BASE_PATH}/${orderId}/delivery/timeline`,
  
  updateDeliveryStatus: (orderId: string) => `${BASE_PATH}/${orderId}/delivery/update`,
  
  uploadProofOfDelivery: (orderId: string) => `${BASE_PATH}/${orderId}/delivery/proof`,
  
  // ============= Activity Log =============
  getActivityLog: (orderId: string) => `${BASE_PATH}/${orderId}/activity`,
  
  // ============= Export Operations =============
  exportToPDF: (orderId: string) => `${BASE_PATH}/${orderId}/export/pdf`,
  
  exportToXLSX: `${BASE_PATH}/export/xlsx`,
};
