import apiService from "./api.service";
import { apiRoutes } from "./api.routes";
import {
  RequirementListResponse,
  RequirementDetail,
} from "@/types/requirement-list";

export interface ListQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

class RequirementListService {
  // ============= Draft Requirements =============
  
  async getDrafts(params?: ListQueryParams): Promise<RequirementListResponse> {
    try {
      const url = apiRoutes.industry.requirements.drafts.list(params);
      const response = await apiService.get<RequirementListResponse>(url);
      return response;
    } catch (error) {
      console.error("Failed to get drafts:", error);
      throw error;
    }
  }

  async deleteDrafts(draftIds: string[]): Promise<{ success: boolean; deleted: number }> {
    try {
      const response = await apiService.remove<{ success: boolean; deleted: number }>(
        apiRoutes.industry.requirements.drafts.bulkDelete,
        { data: { draftIds } }
      );
      return response;
    } catch (error) {
      console.error("Failed to delete drafts:", error);
      throw error;
    }
  }

  // ============= Pending Requirements =============
  
  async getPending(params?: ListQueryParams): Promise<RequirementListResponse> {
    try {
      const url = apiRoutes.industry.requirements.pending.list(params);
      const response = await apiService.get<RequirementListResponse>(url);
      return response;
    } catch (error) {
      console.error("Failed to get pending requirements:", error);
      throw error;
    }
  }

  // ============= Approved Requirements =============
  
  async getApproved(params?: ListQueryParams): Promise<RequirementListResponse> {
    try {
      const url = apiRoutes.industry.requirements.approved.list(params);
      const response = await apiService.get<RequirementListResponse>(url);
      return response;
    } catch (error) {
      console.error("Failed to get approved requirements:", error);
      throw error;
    }
  }

  async publishApproved(requirementIds: string[]): Promise<{ success: boolean; published: number }> {
    try {
      const response = await apiService.post<{ success: boolean; published: number }, { requirementIds: string[] }>(
        apiRoutes.industry.requirements.approved.bulkPublish,
        { requirementIds }
      );
      return response;
    } catch (error) {
      console.error("Failed to publish requirements:", error);
      throw error;
    }
  }

  // ============= Published Requirements =============
  
  async getPublished(params?: ListQueryParams): Promise<RequirementListResponse> {
    try {
      const url = apiRoutes.industry.requirements.published.list(params);
      const response = await apiService.get<RequirementListResponse>(url);
      return response;
    } catch (error) {
      console.error("Failed to get published requirements:", error);
      throw error;
    }
  }

  // ============= Archived Requirements =============
  
  async getArchived(params?: ListQueryParams): Promise<RequirementListResponse> {
    try {
      const url = apiRoutes.industry.requirements.archived.list(params);
      const response = await apiService.get<RequirementListResponse>(url);
      return response;
    } catch (error) {
      console.error("Failed to get archived requirements:", error);
      throw error;
    }
  }

  async archiveRequirements(
    requirementIds: string[], 
    reason: string
  ): Promise<{ success: boolean; archived: number }> {
    try {
      const response = await apiService.post<{ success: boolean; archived: number }, { requirementIds: string[]; reason: string }>(
        apiRoutes.industry.requirements.archived.bulkArchive,
        { requirementIds, reason }
      );
      return response;
    } catch (error) {
      console.error("Failed to archive requirements:", error);
      throw error;
    }
  }

  // ============= Requirement Details =============
  
  async getRequirementById(requirementId: string): Promise<RequirementDetail> {
    try {
      const response = await apiService.get<{ success: boolean; data: RequirementDetail }>(
        apiRoutes.industry.requirements.getById(requirementId)
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get requirement detail:", error);
      throw error;
    }
  }

  // ============= Export Functions =============
  
  async exportToXLSX(type: 'drafts' | 'pending' | 'approved' | 'published' | 'archived', params?: ListQueryParams): Promise<Blob> {
    try {
      const url = apiRoutes.industry.requirements[type].export('xlsx', params);
      const response = await apiService.get<Blob>(url, { responseType: 'blob' });
      return response;
    } catch (error) {
      console.error("Failed to export XLSX:", error);
      throw error;
    }
  }

  async exportToCSV(type: 'drafts' | 'pending' | 'approved' | 'published' | 'archived', params?: ListQueryParams): Promise<Blob> {
    try {
      const url = apiRoutes.industry.requirements[type].export('csv', params);
      const response = await apiService.get<Blob>(url, { responseType: 'blob' });
      return response;
    } catch (error) {
      console.error("Failed to export CSV:", error);
      throw error;
    }
  }
}

export default new RequirementListService();
