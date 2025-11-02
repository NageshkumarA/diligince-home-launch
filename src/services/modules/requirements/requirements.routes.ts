import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/requirements`;

export const requirementsRoutes = {
  // Legacy endpoints
  create: `${API_BASE_PATH}/create_request_note`,
  getByRequestId: (requestId: number) => `${API_BASE_PATH}/get_request_notes/${requestId}`,
  
  // CRUD operations
  getAll: (params?: any) => `${BASE_PATH}${buildQueryString(params)}`,
  getById: (id: string) => `${BASE_PATH}/${id}`,
  update: (id: string) => `${BASE_PATH}/${id}`,
  delete: (id: string) => `${BASE_PATH}/${id}`,
  
  // Actions
  publish: `${BASE_PATH}/publish`,
  archive: (id: string) => `${BASE_PATH}/${id}/archive`,
  
  // Status-specific lists
  getActive: (params?: any) => `${BASE_PATH}/active${buildQueryString(params)}`,
};
