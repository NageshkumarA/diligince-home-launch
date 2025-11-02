import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/approvals`;

export const approvalsRoutes = {
  // Get pending approvals for current user
  getPending: (params?: { 
    userId?: string; 
    role?: string; 
    priority?: string;
    category?: string;
    page?: number; 
    limit?: number 
  }) => `${BASE_PATH}/pending${buildQueryString(params)}`,
  
  // Approve a requirement
  approve: (approvalId: string) => `${BASE_PATH}/${approvalId}/approve`,
  
  // Reject a requirement
  reject: (approvalId: string) => `${BASE_PATH}/${approvalId}/reject`,
  
  // Get approval history
  getHistory: (approvalId: string) => `${BASE_PATH}/${approvalId}/history`,
  
  // Get approval details
  getById: (approvalId: string) => `${BASE_PATH}/${approvalId}`,
  
  // Delegate approval
  delegate: (approvalId: string) => `${BASE_PATH}/${approvalId}/delegate`,
  
  // Escalate approval
  escalate: (approvalId: string) => `${BASE_PATH}/${approvalId}/escalate`,
};
