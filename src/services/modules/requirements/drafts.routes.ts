import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/requirements`;

export const draftsRoutes = {
  // Draft CRUD
  create: `${BASE_PATH}/draft`,
  update: (draftId: string) => `${BASE_PATH}/draft/${draftId}`,
  getById: (draftId: string) => `${BASE_PATH}/draft/${draftId}`,
  getAll: (params?: any) => `${BASE_PATH}/drafts${buildQueryString(params)}`,
  delete: (draftId: string) => `${BASE_PATH}/draft/${draftId}`,
  
  // Draft management
  resume: (draftId: string) => `${BASE_PATH}/draft/${draftId}/resume`,
  
  // Validation
  validateAll: (draftId: string) => `${BASE_PATH}/draft/${draftId}/validate/all`,
  validate: (draftId: string) => `${BASE_PATH}/draft/${draftId}/validate`,
  validateStep: (draftId: string, stepNumber: number) => 
    `${BASE_PATH}/draft/${draftId}/validate/step/${stepNumber}`,
  
  // Documents
  uploadDocuments: (draftId: string) => `${BASE_PATH}/draft/${draftId}/documents`,
  deleteDocument: (draftId: string, documentId: string) => 
    `${BASE_PATH}/draft/${draftId}/documents/${documentId}`,
  
  // Workflow
  approvalWorkflow: (draftId: string) => `${BASE_PATH}/draft/${draftId}/approval-workflow`,
};
