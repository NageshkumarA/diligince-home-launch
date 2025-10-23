import { apiService } from '@/services/core';
import { requirementsFeedRoutes } from './requirements-feed.routes';
import { 
  RequirementWithAI, 
  BrowseFilters, 
  RequirementListResponse,
  RequirementsFeedStats 
} from '@/types/requirement-feed';
import { mockRequirements, mockStats } from '@/mocks/requirements-feed-mock';

class RequirementsFeedService {
  /**
   * Get requirements visible to vendor/professional
   * TODO: Replace with actual API call when backend is ready
   */
  async getBrowseRequirements(filters?: BrowseFilters): Promise<RequirementListResponse> {
    // Mock implementation
    let filteredRequirements = [...mockRequirements];

    // Apply filters
    if (filters?.category) {
      filteredRequirements = filteredRequirements.filter(r => r.category === filters.category);
    }
    if (filters?.status) {
      filteredRequirements = filteredRequirements.filter(r => r.status === filters.status);
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredRequirements = filteredRequirements.filter(r => 
        r.title.toLowerCase().includes(searchLower) || 
        r.description.toLowerCase().includes(searchLower) ||
        r.company.toLowerCase().includes(searchLower)
      );
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      requirements: filteredRequirements.slice(start, end),
      total: filteredRequirements.length,
      page,
      limit,
      hasMore: end < filteredRequirements.length,
    };

    // Future API implementation:
    // return apiService.get<RequirementListResponse>(
    //   requirementsFeedRoutes.browse(filters)
    // );
  }

  /**
   * Get AI-recommended requirements
   * TODO: Replace with actual API call when AI backend is ready
   */
  async getRecommendedRequirements(userType: string): Promise<RequirementWithAI[]> {
    // Mock implementation - return top recommended requirements
    return mockRequirements
      .filter(r => r.aiRecommendation)
      .sort((a, b) => (b.aiRecommendation?.relevanceScore || 0) - (a.aiRecommendation?.relevanceScore || 0))
      .slice(0, 5);

    // Future API implementation:
    // return apiService.get<RequirementWithAI[]>(
    //   requirementsFeedRoutes.recommended(userType)
    // );
  }

  /**
   * Get requirement details
   * TODO: Replace with actual API call when backend is ready
   */
  async getRequirementDetails(requirementId: string): Promise<RequirementWithAI> {
    // Mock implementation
    const requirement = mockRequirements.find(r => r.id === requirementId);
    if (!requirement) {
      throw new Error('Requirement not found');
    }
    return requirement;

    // Future API implementation:
    // return apiService.get<RequirementWithAI>(
    //   requirementsFeedRoutes.getById(requirementId)
    // );
  }

  /**
   * Get dashboard statistics
   * TODO: Replace with actual API call when backend is ready
   */
  async getStats(userType: string): Promise<RequirementsFeedStats> {
    // Mock implementation
    return mockStats;

    // Future API implementation:
    // return apiService.get<RequirementsFeedStats>(
    //   requirementsFeedRoutes.stats(userType)
    // );
  }
}

export const requirementsFeedService = new RequirementsFeedService();
export default requirementsFeedService;
