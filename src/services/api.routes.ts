/**
 * @deprecated This file is maintained for backward compatibility only.
 * 
 * Please migrate to modular imports:
 * 
 * OLD:
 * import { apiRoutes } from '@/services/api.routes';
 * const url = apiRoutes.industry.quotations.pending();
 * 
 * NEW:
 * import { quotationsRoutes } from '@/services/modules/quotations';
 * const url = quotationsRoutes.pending();
 * 
 * OR use central export:
 * import { quotationsRoutes } from '@/services';
 * 
 * This file will be removed in v2.0.0
 */

export { apiRoutes, generateQueryParams, buildQueryString } from './index';

if (process.env.NODE_ENV === 'development') {
  console.warn(
    '[DEPRECATION] api.routes.ts is deprecated. Please import from specific modules.'
  );
}
