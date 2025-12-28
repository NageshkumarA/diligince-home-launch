import apiService from '../../core/api.service';
import { vendorProfileRoutes } from './vendor-profile.routes';
import { VendorProfile, VerificationDocument, VendorDocumentType } from '@/types/verification';
import { errorHandler } from '@/utils/errorHandler.utils';

export interface SaveVendorProfileResponse {
  success: boolean;
  data: VendorProfile | { profile: VendorProfile };
  message?: string;
}

export interface SubmitVendorVerificationResponse {
  success: boolean;
  data: {
    verificationId: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    estimatedCompletionAt: string;
    estimatedCompletionHours: number;
    isLocked: boolean;
    nextSteps: string[];
  };
  message?: string;
}

export interface UploadVendorDocumentResponse {
  success: boolean;
  data: VerificationDocument;
  message?: string;
}

export interface DeleteVendorDocumentResponse {
  success: boolean;
  message?: string;
}

/**
 * Vendor Profile Service
 * Handles all vendor profile related API calls
 */
class VendorProfileService {
  /**
   * Get vendor profile
   * Returns null for new users (404)
   */
  async getProfile(): Promise<VendorProfile | null> {
    try {
      const response = await apiService.get<{ success: boolean; data: VendorProfile }>(
        vendorProfileRoutes.get
      );
      return response.data;
    } catch (error: any) {
      // 404 means new user with no profile yet - return null gracefully
      if (error?.response?.status === 404) {
        return null;
      }
      errorHandler.handleApiError(error, 'Failed to fetch vendor profile');
      throw error;
    }
  }

  /**
   * Save or update vendor profile
   */
  async saveProfile(profile: Partial<VendorProfile>): Promise<SaveVendorProfileResponse> {
    try {
      const response = await apiService.post<SaveVendorProfileResponse, Partial<VendorProfile>>(
        vendorProfileRoutes.save,
        profile
      );
      return response;
    } catch (error: any) {
      errorHandler.handleApiError(error, 'Failed to save vendor profile');
      throw error;
    }
  }

  /**
   * Upload a verification document
   */
  async uploadDocument(
    file: File,
    documentType: VendorDocumentType
  ): Promise<UploadVendorDocumentResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      const response = await apiService.post<UploadVendorDocumentResponse, FormData>(
        vendorProfileRoutes.uploadDocument,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error: any) {
      errorHandler.handleApiError(error, 'Failed to upload document');
      throw error;
    }
  }

  /**
   * Delete a verification document
   */
  async deleteDocument(documentId: string): Promise<DeleteVendorDocumentResponse> {
    try {
      const response = await apiService.remove<DeleteVendorDocumentResponse>(
        vendorProfileRoutes.deleteDocument(documentId)
      );
      return response;
    } catch (error: any) {
      errorHandler.handleApiError(error, 'Failed to delete document');
      throw error;
    }
  }

  /**
   * Submit profile for verification with consent
   */
  async submitForVerification(
    consentGiven: boolean,
    consentTimestamp: string
  ): Promise<SubmitVendorVerificationResponse> {
    try {
      const response = await apiService.post<SubmitVendorVerificationResponse, { consentGiven: boolean; consentTimestamp: string }>(
        vendorProfileRoutes.submitVerification,
        { consentGiven, consentTimestamp }
      );
      return response;
    } catch (error: any) {
      errorHandler.handleApiError(error, 'Failed to submit for verification');
      throw error;
    }
  }

  /**
   * Get profile completion status and missing items
   */
  async getCompletionStatus(): Promise<{
    vendorCategory: string;
    completionPercentage: number;
    isProfileComplete: boolean;
    canSubmit: boolean;
    missingFields: string[];
    missingDocuments: string[];
    requiredDocuments: {
      mandatory: string[];
      categorySpecific: string[];
    };
    optionalDocuments: string[];
    uploadedDocuments: string[];
  }> {
    try {
      const response = await apiService.get<{
        success: boolean;
        data: {
          vendorCategory: string;
          completionPercentage: number;
          isProfileComplete: boolean;
          canSubmit: boolean;
          missingFields: string[];
          missingDocuments: string[];
          requiredDocuments: {
            mandatory: string[];
            categorySpecific: string[];
          };
          optionalDocuments: string[];
          uploadedDocuments: string[];
        };
      }>(vendorProfileRoutes.completionStatus);
      return response.data;
    } catch (error: any) {
      errorHandler.handleApiError(error, 'Failed to fetch completion status');
      throw error;
    }
  }
}

export const vendorProfileService = new VendorProfileService();
export default vendorProfileService;
