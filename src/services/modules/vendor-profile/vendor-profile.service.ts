import apiService from '../../core/api.service';
import { vendorProfileRoutes } from './vendor-profile.routes';
import { VendorProfile, VerificationDocument, VendorDocumentType } from '@/types/verification';
import { errorHandler } from '@/utils/errorHandler.utils';

// API base URL for document URLs
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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
   * Normalize documents array from backend to frontend structure
   * Handles: fileType → type, relative URLs → full URLs, uploadedAt → Date
   */
  private normalizeDocuments(docs: any[]): VerificationDocument[] {
    if (!docs || !Array.isArray(docs)) return [];

    return docs.map(doc => ({
      id: doc.id || doc._id || '',
      name: doc.name || doc.fileName || doc.originalName || '',
      type: doc.type || doc.fileType || doc.mimeType || 'application/octet-stream',
      size: doc.size || doc.fileSize || 0,
      url: this.normalizeDocumentUrl(doc.url || doc.fileUrl || doc.path || ''),
      documentType: doc.documentType || doc.docType || 'other',
      uploadedAt: doc.uploadedAt ? new Date(doc.uploadedAt) : new Date(),
      status: doc.status || 'pending',
      remarks: doc.remarks || doc.comment || undefined,
    }));
  }

  /**
   * Normalize document URL to full URL
   */
  private normalizeDocumentUrl(url: string): string {
    if (!url) return '';
    // Already a full URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Relative URL - prepend API base URL
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${cleanPath}`;
  }

  /**
   * Normalize backend profile response to frontend VendorProfile interface
   * Handles multiple backend structures for backward compatibility
   */
  private normalizeProfile(backendData: any): VendorProfile {
    // Handle nested profile wrapper: { profile: {...} } or direct object
    const data = backendData?.profile || backendData;

    // Extract contact info - handle nested contactInfo or flat structure
    const email = data.email || data.contactInfo?.email || '';
    const mobile = data.mobile || data.phone || data.contactInfo?.phone || data.contactInfo?.mobile || '';
    const telephone = data.telephone || data.contactInfo?.telephone || '';
    const website = data.website || data.contactInfo?.website || '';

    // Extract legal info - handle nested businessRegistration or flat structure
    const panNumber = data.panNumber || data.businessRegistration?.taxId || data.businessRegistration?.panNumber || '';
    const gstNumber = data.gstNumber || data.businessRegistration?.gstNumber || '';
    const registrationNumber = data.registrationNumber || data.businessRegistration?.registrationNumber || '';

    // Extract documents - handle verificationDocuments or documents
    const rawDocs = data.documents || data.verificationDocuments || [];

    return {
      // Basic Info
      businessName: data.businessName || data.companyName || '',
      vendorCategory: data.vendorCategory || data.category || 'Service Vendor',
      specialization: data.specialization || data.specialty || '',

      // Legal
      panNumber,
      gstNumber,
      registrationNumber,

      // Contact
      email,
      mobile,
      telephone: telephone || undefined,
      website: website || undefined,

      // Business Details
      primaryIndustry: data.primaryIndustry || data.industry || undefined,
      yearsInBusiness: data.yearsInBusiness || data.experience || undefined,
      businessLocation: data.businessLocation || data.location || undefined,
      serviceAreas: data.serviceAreas || data.areas || undefined,

      // Documents
      documents: this.normalizeDocuments(rawDocs),

      // Verification
      verificationStatus: data.verificationStatus || 'incomplete',
      verificationSubmittedAt: data.verificationSubmittedAt || undefined,
      verificationCompletedAt: data.verificationCompletedAt || undefined,
      verificationRemarks: data.verificationRemarks || undefined,
      verificationSteps: data.verificationSteps || undefined,

      // Consent
      consentGiven: data.consentGiven || false,
      consentTimestamp: data.consentTimestamp || undefined,

      // Completion
      isProfileComplete: data.isProfileComplete || false,
      profileCompletionPercentage: data.profileCompletionPercentage || 0,
    };
  }

  /**
   * Get vendor profile
   * Returns null for new users (404)
   */
  async getProfile(): Promise<VendorProfile | null> {
    try {
      const response = await apiService.get<{ success: boolean; data: any }>(
        vendorProfileRoutes.get
      );
      
      // Normalize the response data to frontend structure
      return this.normalizeProfile(response.data);
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

      // Normalize the response data
      const rawData = (response.data as any)?.profile || response.data;
      const normalizedProfile = this.normalizeProfile(rawData);

      return {
        success: response.success,
        data: normalizedProfile,
        message: response.message,
      };
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

      const response = await apiService.post<any, FormData>(
        vendorProfileRoutes.uploadDocument,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Handle both response structures: {document: {...}} or direct document object
      const rawDoc = response.data?.document || response.data;
      const normalizedDocs = this.normalizeDocuments([rawDoc]);

      return {
        success: response.success,
        data: normalizedDocs[0],
        message: response.message,
      };
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
