import { API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/vendor-profile`;

export const vendorProfileRoutes = {
  get: BASE_PATH,
  save: `${BASE_PATH}/save`,
  uploadDocument: `${BASE_PATH}/documents/upload`,
  deleteDocument: (documentId: string) => `${BASE_PATH}/documents/${documentId}`,
  submitVerification: `${BASE_PATH}/submit-verification`,
};
