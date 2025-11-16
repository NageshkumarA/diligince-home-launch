import apiService from '../../core/api.service';
import { requirementListsRoutes } from './lists.routes';
import { requirementsRoutes } from './requirements.routes';
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
      const url = requirementListsRoutes.drafts.list(params);
      const response = await apiService.get<any>(url);
      
      // Transform API response to match frontend expectations
      // Drafts API returns: { data: { drafts: [], pagination: {} } }
      return {
        success: response.success,
        data: {
          requirements: response.data?.drafts || [],
          pagination: {
            currentPage: response.data?.pagination?.page || 1,
            pageSize: response.data?.pagination?.limit || 10,
            totalItems: response.data?.pagination?.total || 0,
            totalPages: response.data?.pagination?.totalPages || 0,
          },
          filters: {
            applied: {},
            available: {}
          }
        }
      };
    } catch (error) {
      console.error("Failed to get drafts:", error);
      throw error;
    }
  }

  async deleteDrafts(draftIds: string[]): Promise<{ success: boolean; deleted: number }> {
    try {
      const response = await apiService.remove<{ success: boolean; deleted: number }>(
        requirementListsRoutes.drafts.bulkDelete,
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
      const url = requirementListsRoutes.pending.list(params);
      const response = await apiService.get<any>(url);
      
      // Transform API response to match frontend expectations
      return {
        success: response.success,
        data: {
          requirements: response.data || [],
          pagination: {
            currentPage: response.pagination?.page || 1,
            pageSize: response.pagination?.limit || 10,
            totalItems: response.pagination?.total || 0,
            totalPages: response.pagination?.totalPages || 0,
          },
          filters: {
            applied: {},
            available: {}
          }
        }
      };
    } catch (error) {
      console.error("Failed to get pending requirements:", error);
      throw error;
    }
  }

  // ============= Approved Requirements =============
  
  async getApproved(params?: ListQueryParams): Promise<RequirementListResponse> {
    try {
      const url = requirementListsRoutes.approved.list(params);
      const response = await apiService.get<any>(url);
      
      // Transform API response to match frontend expectations
      return {
        success: response.success,
        data: {
          requirements: response.data || [],
          pagination: {
            currentPage: response.pagination?.page || 1,
            pageSize: response.pagination?.limit || 10,
            totalItems: response.pagination?.total || 0,
            totalPages: response.pagination?.totalPages || 0,
          },
          filters: {
            applied: {},
            available: {}
          }
        }
      };
    } catch (error) {
      console.error("Failed to get approved requirements:", error);
      throw error;
    }
  }

  async publishApproved(requirementIds: string[]): Promise<{ success: boolean; published: number }> {
    try {
      const response = await apiService.post<{ success: boolean; published: number }, { requirementIds: string[] }>(
        requirementListsRoutes.approved.bulkPublish,
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
      const url = requirementListsRoutes.published.list(params);
      const response = await apiService.get<any>(url);
      
      // Transform API response to match frontend expectations
      return {
        success: response.success,
        data: {
          requirements: response.data || [],
          pagination: {
            currentPage: response.pagination?.page || 1,
            pageSize: response.pagination?.limit || 10,
            totalItems: response.pagination?.total || 0,
            totalPages: response.pagination?.totalPages || 0,
          },
          filters: {
            applied: {},
            available: {}
          }
        }
      };
    } catch (error) {
      console.error("Failed to get published requirements:", error);
      throw error;
    }
  }

  // ============= Archived Requirements =============
  
  async getArchived(params?: ListQueryParams): Promise<RequirementListResponse> {
    try {
      const url = requirementListsRoutes.archived.list(params);
      const response = await apiService.get<any>(url);
      
      // Transform API response to match frontend expectations
      return {
        success: response.success,
        data: {
          requirements: response.data || [],
          pagination: {
            currentPage: response.pagination?.page || 1,
            pageSize: response.pagination?.limit || 10,
            totalItems: response.pagination?.total || 0,
            totalPages: response.pagination?.totalPages || 0,
          },
          filters: {
            applied: {},
            available: {}
          }
        }
      };
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
        requirementListsRoutes.archived.bulkArchive,
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
        requirementsRoutes.getById(requirementId)
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
      const url = requirementListsRoutes[type].export.xlsx(params);
      const response = await apiService.get<Blob>(url, { responseType: 'blob' });
      return response;
    } catch (error) {
      console.error("Failed to export XLSX:", error);
      throw error;
    }
  }

  async exportToCSV(type: 'drafts' | 'pending' | 'approved' | 'published' | 'archived', params?: ListQueryParams): Promise<Blob> {
    try {
      const url = requirementListsRoutes[type].export.csv(params);
      const response = await apiService.get<Blob>(url, { responseType: 'blob' });
      return response;
    } catch (error) {
      console.error("Failed to export CSV:", error);
      throw error;
    }
  }
}

export default new RequirementListService();
