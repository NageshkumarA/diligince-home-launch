import { buildQueryString } from '@/services/core/api.config';
import { BrowseFilters } from '@/types/requirement-feed';

export const requirementsFeedRoutes = {
  browse: (filters?: BrowseFilters) => `/api/v1/requirements/browse${buildQueryString(filters || {})}`,
  recommended: (userType: string) => `/api/v1/requirements/recommended/${userType}`,
  getById: (id: string) => `/api/v1/requirements/${id}`,
  stats: (userType: string) => `/api/v1/requirements/stats/${userType}`,
  apply: (id: string) => `/api/v1/requirements/${id}/apply`,
  submitQuote: (id: string) => `/api/v1/requirements/${id}/submit-quote`,
};
