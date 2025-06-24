
// Export all utility functions and hooks for easy importing
export * from './colorUtils';
export * from './navigationConfigs';
export * from './dashboardConfigs';

// Export specific functions from dateUtils
export { 
  formatDate,
  formatDateRange,
  getDaysRemaining,
  isOverdue,
  getDeadlineStatus,
  formatTimeAgo,
  addBusinessDays,
  type DateFormatOptions
} from './dateUtils';

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

// Re-export contexts and types - being explicit to avoid conflicts
export { ThemeProvider, useTheme } from '../contexts/ThemeContext';
export { NotificationProvider, useNotificationContext } from '../contexts/NotificationContext';
export { UserProvider, useUser } from '../contexts/UserContext';

// Export types from shared - being explicit about which types to avoid conflicts
export type { 
  BaseMessage,
  StatItem,
  BaseModal,
  UserProfile,
  UserRole,
  BaseNotification,
  ThemeConfig,
  ThemeColors as SharedThemeColors
} from '../types/shared';

// Export domain-specific types
export type {
  VendorProfile,
  VendorType,
  VendorStatus
} from '../types/vendor';

export type {
  DashboardStat,
  NavigationItem
} from '../types/dashboard';

export type {
  ProfessionalProfile,
  ProfessionalStatus
} from '../types/professional';

export type {
  LogisticsVendorProfile,
  LogisticsSpecialization
} from '../types/logistics';

export type {
  IndustryProfile,
  IndustryType,
  Requirement,
  Priority
} from '../types/industry';
