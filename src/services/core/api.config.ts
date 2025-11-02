// API Configuration & Utilities

export const API_BASE_PATH = '/api/v1';

/**
 * Build query string from parameters object
 */
export function buildQueryString(params?: Record<string, any>): string {
  if (!params) return '';
  
  const queryParams = new URLSearchParams();
  for (const key in params) {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '') {
      queryParams.append(key, String(value));
    }
  }
  
  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Legacy alias for backward compatibility
 */
export const generateQueryParams = buildQueryString;
