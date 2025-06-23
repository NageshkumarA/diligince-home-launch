
// Export all context providers and hooks for easy importing
export { ThemeProvider, useTheme } from './ThemeContext';
export { NotificationProvider, useNotificationContext } from './NotificationContext';
export { UserProvider, useUser } from './UserContext';
export { VendorSpecializationProvider, useVendorSpecialization } from './VendorSpecializationContext';

// Export types
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

export type { VendorSpecialization } from './VendorSpecializationContext';
