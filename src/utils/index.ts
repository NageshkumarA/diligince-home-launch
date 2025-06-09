
// Export all utility functions and hooks for easy importing
export * from './colorUtils';
export * from './dateUtils';
export * from './statusUtils';
export * from './shared';
export * from './navigationConfigs';
export * from './dashboardConfigs';

// Re-export hooks for convenience
export { useModal } from '../hooks/useModal';
export { useSearch } from '../hooks/useSearch';
export { usePagination } from '../hooks/usePagination';
export { useNotifications } from '../hooks/useNotifications';
