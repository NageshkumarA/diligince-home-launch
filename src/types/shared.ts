
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
