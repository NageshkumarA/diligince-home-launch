import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/budget`;

export const budgetRoutes = {
  // Get overall budget overview
  getOverview: (params?: { fiscalYear?: string }) =>
    `${BASE_PATH}/overview${buildQueryString(params)}`,
  
  // Get budget breakdown by categories
  getCategories: (params?: { fiscalYear?: string }) =>
    `${BASE_PATH}/categories${buildQueryString(params)}`,
  
  // Get budget utilization details
  getUtilization: (categoryId?: string) =>
    categoryId 
      ? `${BASE_PATH}/utilization/${categoryId}`
      : `${BASE_PATH}/utilization`,
  
  // Update budget allocation
  updateAllocation: (categoryId: string) => `${BASE_PATH}/categories/${categoryId}`,
};
