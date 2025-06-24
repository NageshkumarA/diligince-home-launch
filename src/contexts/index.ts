
// Export all context providers and hooks for easy importing
export { ThemeProvider, useTheme } from './ThemeContext';
export { NotificationProvider, useNotificationContext } from './NotificationContext';
export { UserProvider, useUser } from './UserContext';
export { VendorSpecializationProvider, useVendorSpecialization } from './VendorSpecializationContext';

// Export shared types
export type { 
  BaseMessage,
  StatItem,
  BaseModal,
  UserProfile,
  UserRole,
  BaseNotification,
  ThemeConfig,
  ThemeColors
} from '../types/shared';

// Export vendor types
export type {
  VendorProfile,
  VendorType,
  VendorStatus,
  VendorStats,
  VendorService,
  VendorProduct
} from '../types/vendor';

// Export dashboard types
export type {
  DashboardStat,
  DashboardCard,
  NavigationItem,
  SidebarConfig
} from '../types/dashboard';

// Export professional types
export type {
  ProfessionalProfile,
  ProfessionalStatus,
  ProfessionalAvailability,
  Certification,
  ProfessionalProject,
  ProjectStatus
} from '../types/professional';

// Export logistics types
export type {
  LogisticsVendorProfile,
  LogisticsSpecialization,
  LogisticsStatus,
  License,
  Equipment,
  EquipmentStatus,
  TransportRequest,
  Location,
  CargoDetails,
  RequestStatus
} from '../types/logistics';

// Export industry types
export type {
  IndustryProfile,
  IndustryType,
  IndustryStatus,
  Requirement,
  RequirementCategory,
  RequirementStatus,
  Priority
} from '../types/industry';

// Export VendorSpecialization type from context
export type { VendorSpecialization } from './VendorSpecializationContext';
