import { UserProfile } from '@/types/shared';

/**
 * Maps API role format to UserContext role format
 * API: 'IndustryAdmin' | 'IndustryMember' | 'Professional' | 'Vendor' | 'SuperAdmin' | 'Support'
 * UserContext: 'industry' | 'professional' | 'vendor'
 */
export const mapApiRoleToUserRole = (apiRole: string): 'industry' | 'professional' | 'vendor' => {
  if (apiRole === 'IndustryAdmin' || apiRole === 'IndustryMember') {
    return 'industry';
  }
  if (apiRole === 'Professional') {
    return 'professional';
  }
  if (apiRole === 'Vendor') {
    return 'vendor';
  }
  return 'industry'; // Default fallback
};

/**
 * Maps UserContext role to menuConfig key
 * Handles vendor categories: 'service-vendor', 'product-vendor', 'logistics-vendor'
 */
export const getMenuConfigKey = (user: UserProfile): string => {
  if (user.role === 'vendor' && user.profile?.vendorCategory) {
    return `${user.profile.vendorCategory}-vendor`;
  }
  return user.role;
};
