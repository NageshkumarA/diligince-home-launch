import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/quotations`;

export const quotationsRoutes = {
  // List endpoints
  pending: (params?: any) => `${BASE_PATH}/pending${buildQueryString(params)}`,
  approved: (params?: any) => `${BASE_PATH}/approved${buildQueryString(params)}`,
  all: (params?: any) => `${BASE_PATH}/all${buildQueryString(params)}`,

  // CRUD operations
  getById: (id: string) => `${BASE_PATH}/${id}`,

  // Actions
  approve: (id: string) => `${BASE_PATH}/${id}/approve`,
  reject: (id: string) => `${BASE_PATH}/${id}/reject`,
  clarification: (id: string) => `${BASE_PATH}/${id}/request-clarification`,

  // Activity & History
  activity: (id: string) => `${BASE_PATH}/${id}/activity`,

  // Related resources
  byRequirement: (requirementId: string, params?: any) =>
    `${BASE_PATH}/by-requirement/${requirementId}${buildQueryString(params)}`,

  // Documents
  downloadDocument: (quotationId: string, documentId: string) =>
    `${BASE_PATH}/${quotationId}/documents/${documentId}/download`,

  viewDocument: (quotationId: string, documentId: string) =>
    `${BASE_PATH}/${quotationId}/documents/${documentId}/view`,

  // Validation
  validateAction: (id: string, action: string) =>
    `${BASE_PATH}/${id}/validate-action?action=${action}`,

  // Comparison
  compare: `${BASE_PATH}/compare`,
  analyze: `${BASE_PATH}/analyze`,

  // Bulk operations
  bulkApprove: `${BASE_PATH}/bulk-approve`,
  bulkReject: `${BASE_PATH}/bulk-reject`,

  // Export
  export: {
    xlsx: (params?: any) => `${BASE_PATH}/export/xlsx${buildQueryString(params)}`,
    csv: (params?: any) => `${BASE_PATH}/export/csv${buildQueryString(params)}`,
  },
};
