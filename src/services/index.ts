// ============= Core Services =============
export { apiService } from './core';
export { buildQueryString, generateQueryParams, API_BASE_PATH } from './core/api.config';

// ============= Modules (Alphabetical) =============
export * from './modules/analytics';
export * from './modules/approvals';
export * from './modules/auth';
export * from './modules/budget';
export * from './modules/dashboard';
export * from './modules/purchase-orders';
export * from './modules/quotations';
export * from './modules/requirements';
export * from './modules/vendors';

// ============= Convenience Aggregations =============
import { authRoutes } from './modules/auth';
import { dashboardRoutes } from './modules/dashboard';
import { approvalsRoutes } from './modules/approvals';
import { analyticsRoutes } from './modules/analytics';
import { budgetRoutes } from './modules/budget';
import { vendorsRoutes } from './modules/vendors';
import { requirementsRoutes, draftsRoutes, requirementListsRoutes } from './modules/requirements';
import { quotationsRoutes } from './modules/quotations';
import { purchaseOrdersRoutes } from './modules/purchase-orders';

/**
 * Aggregated routes object for backward compatibility
 * @deprecated Import from specific modules instead:
 * import { quotationsRoutes } from '@/services/modules/quotations';
 */
export const apiRoutes = {
  auth: authRoutes,
  industry: {
    dashboard: dashboardRoutes,
    approvals: approvalsRoutes,
    analytics: analyticsRoutes,
    budget: budgetRoutes,
    vendors: vendorsRoutes,
    requirements: {
      ...requirementsRoutes,
      draft: draftsRoutes,
      drafts: requirementListsRoutes.drafts,
      pending: requirementListsRoutes.pending,
      approved: requirementListsRoutes.approved,
      published: requirementListsRoutes.published,
      archived: requirementListsRoutes.archived,
    },
    quotations: quotationsRoutes,
    purchaseOrders: purchaseOrdersRoutes,
  },
};
