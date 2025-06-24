
// Shared type definitions across the application

export type UserRole = 'industry' | 'professional' | 'vendor';

export type VendorCategory = 'service' | 'product' | 'logistics';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  initials: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  preferences: UserPreferences;
  profile?: UserProfileDetails;
}

export interface UserProfileDetails {
  // Industry user details
  companyName?: string;
  industryType?: string;
  
  // Professional user details
  fullName?: string;
  expertise?: string;
  
  // Vendor user details
  businessName?: string;
  phone?: string;
  vendorCategory?: VendorCategory;
  specialization?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationSettings;
  language: string;
  timezone: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

// Missing type definitions that other files depend on
export interface BaseMessage {
  id: string;
  content: string;
  timestamp: string;
  type?: 'info' | 'warning' | 'error' | 'success';
}

export interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface BaseModal {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface BaseNotification {
  id?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  colors: ThemeColors;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  neutral: string;
}

// Dashboard routing utility
export const getDashboardRoute = (userProfile: UserProfile): string => {
  switch (userProfile.role) {
    case 'industry':
      return '/industry-dashboard';
    case 'professional':
      return '/professional-dashboard';
    case 'vendor':
      const vendorCategory = userProfile.profile?.vendorCategory;
      switch (vendorCategory) {
        case 'service':
          return '/service-vendor-dashboard';
        case 'product':
          return '/product-vendor-dashboard';
        case 'logistics':
          return '/logistics-vendor-dashboard';
        default:
          return '/vendor-profile';
      }
    default:
      return '/';
  }
};
