
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  mode: 'light' | 'dark';
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

// User Types
export type UserRole = 'industry' | 'professional' | 'vendor';
export type VendorCategory = 'service' | 'product' | 'logistics';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  language: string;
  timezone: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials?: string;
  profile?: any;
  preferences?: UserPreferences;
  createdAt?: string;
  updatedAt?: string;
}

// UI Component Types
export interface BaseMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  read: boolean;
}

export interface StatItem {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface BaseModal {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface BaseNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

// Dashboard routing utility
export const getDashboardRoute = (user: UserProfile): string => {
  switch (user.role) {
    case 'industry':
      return '/industry-dashboard';
    case 'professional':
      return '/professional-dashboard';
    case 'vendor':
      if (user.profile?.vendorCategory === 'service') {
        return '/service-vendor-dashboard';
      } else if (user.profile?.vendorCategory === 'product') {
        return '/product-vendor-dashboard';
      } else if (user.profile?.vendorCategory === 'logistics') {
        return '/logistics-vendor-dashboard';
      }
      return '/vendor-dashboard';
    default:
      return '/';
  }
};
