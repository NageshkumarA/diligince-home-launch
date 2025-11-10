import apiService from '../../core/api.service';
import { diligenceHubProfessionalsRoutes } from './professionals.routes';
import type { ProfessionalListResponse, ProfessionalSearchFilters, ProfessionalListItem } from '@/types/professional';

class DiligenceHubProfessionalsService {
  async searchProfessionals(filters?: ProfessionalSearchFilters): Promise<ProfessionalListResponse> {
    return apiService.get(diligenceHubProfessionalsRoutes.search(filters));
  }

  async getProfessionalById(professionalId: string): Promise<ProfessionalListItem> {
    return apiService.get(diligenceHubProfessionalsRoutes.getById(professionalId));
  }

  async getExpertiseAreas(): Promise<string[]> {
    return apiService.get(diligenceHubProfessionalsRoutes.getExpertiseAreas());
  }

  async getSkills(): Promise<string[]> {
    return apiService.get(diligenceHubProfessionalsRoutes.getSkills());
  }

  async getLocations(): Promise<string[]> {
    return apiService.get(diligenceHubProfessionalsRoutes.getLocations());
  }
}

export const diligenceHubProfessionalsService = new DiligenceHubProfessionalsService();
export default diligenceHubProfessionalsService;
