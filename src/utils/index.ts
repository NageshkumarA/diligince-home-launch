
// Export all utility functions and hooks for easy importing
export * from './colorUtils';
export * from './dateUtils';
export * from './navigationConfigs';
export * from './dashboardConfigs';

// Export specific functions from statusUtils to avoid conflicts
export { 
  statusConfigs, 
  priorityConfigs, 
  paymentStatusConfigs,
  getStatusConfig,
  getPriorityConfig,
  getPaymentStatusConfig,
  type StatusType,
  type PriorityType,
  type PaymentStatusType,
  type StatusConfig
} from './statusUtils';

// Export shared utilities
export * from './shared';

// Re-export hooks for convenience
export { useModal } from '../hooks/useModal';
export { useSearch } from '../hooks/useSearch';
export { usePagination } from '../hooks/usePagination';
export { useNotifications } from '../hooks/useNotifications';
