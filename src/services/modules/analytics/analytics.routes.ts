import { buildQueryString, API_BASE_PATH } from '../../core/api.config';

const BASE_PATH = `${API_BASE_PATH}/industry/analytics`;

export const analyticsRoutes = {
  // Get comprehensive procurement analytics
  getProcurement: (params?: { 
    startDate?: string; 
    endDate?: string; 
    groupBy?: string 
  }) => `${BASE_PATH}/procurement${buildQueryString(params)}`,
  
  // Get spend breakdown by category
  getSpendByCategory: (params?: { 
    period?: string;
    startDate?: string;
    endDate?: string;
  }) => `${BASE_PATH}/spend-by-category${buildQueryString(params)}`,
  
  // Get monthly spend trend
  getMonthlyTrend: (params?: { 
    months?: number;
    category?: string;
  }) => `${BASE_PATH}/monthly-trend${buildQueryString(params)}`,
  
  // Get cost savings analytics
  getCostSavings: (params?: { period?: string }) =>
    `${BASE_PATH}/cost-savings${buildQueryString(params)}`,
};
