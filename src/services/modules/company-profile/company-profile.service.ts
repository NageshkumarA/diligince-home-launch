import apiService from '../../core/api.service';
import { companyProfileRoutes } from './company-profile.routes';
import { CompanyProfile, VerificationDocument } from '@/types/verification';

export interface SaveProfileResponse {
  success: boolean;
  data: CompanyProfile;
  message?: string;
}

export interface SubmitVerificationResponse {
  success: boolean;
  data: {
    verificationId: string;
    estimatedCompletionAt: string;
    profile: CompanyProfile;
  };
  message?: string;
}

export interface UploadDocumentResponse {
  success: boolean;
  data: VerificationDocument;
  message?: string;
}

export interface DeleteDocumentResponse {
  success: boolean;
  message?: string;
}

/**
 * Company Profile Service
 * Handles all company profile related API calls
 */
class CompanyProfileService {
  /**
   * Get company profile
   */
  async getProfile(): Promise<CompanyProfile> {
    const response = await apiService.get<{ success: boolean; data: CompanyProfile }>(
      companyProfileRoutes.get
    );
    return response.data;
  }

  /**
   * Save or update company profile
   */
  async saveProfile(profile: Partial<CompanyProfile>): Promise<SaveProfileResponse> {
    return await apiService.post<SaveProfileResponse, Partial<CompanyProfile>>(
      companyProfileRoutes.save,
      profile
    );
  }

  /**
   * Upload a verification document
   */
  async uploadDocument(
    file: File,
    documentType: VerificationDocument['documentType']
  ): Promise<UploadDocumentResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    return await apiService.post<UploadDocumentResponse, FormData>(
      companyProfileRoutes.uploadDocument,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  /**
   * Delete a verification document
   */
  async deleteDocument(documentId: string): Promise<DeleteDocumentResponse> {
    return await apiService.remove<DeleteDocumentResponse>(
      companyProfileRoutes.deleteDocument(documentId)
    );
  }

  /**
   * Submit profile for verification
   */
  async submitForVerification(): Promise<SubmitVerificationResponse> {
    return await apiService.post<SubmitVerificationResponse, {}>(
      companyProfileRoutes.submitVerification,
      {}
    );
  }
}

export const companyProfileService = new CompanyProfileService();
export default companyProfileService;
