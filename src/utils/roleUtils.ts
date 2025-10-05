// Role utility functions for consistent role checking across the application

export type UserRole = 'IndustryAdmin' | 'IndustryMember' | 'Professional' | 'Vendor' | 'SuperAdmin' | 'Support';
export type RoleCategory = 'industry' | 'professional' | 'vendor' | 'admin' | 'support';

/**
 * Check if a user role belongs to the industry category
 */
export const isIndustryRole = (role: UserRole | null | undefined): boolean => {
  return role === 'IndustryAdmin' || role === 'IndustryMember';
};

/**
 * Check if a user role belongs to the professional category
 */
export const isProfessionalRole = (role: UserRole | null | undefined): boolean => {
  return role === 'Professional';
};

/**
 * Check if a user role belongs to the vendor category
 */
export const isVendorRole = (role: UserRole | null | undefined): boolean => {
  return role === 'Vendor';
};

/**
 * Check if a user role is an admin role
 */
export const isAdminRole = (role: UserRole | null | undefined): boolean => {
  return role === 'SuperAdmin';
};

/**
 * Check if a user role is a support role
 */
export const isSupportRole = (role: UserRole | null | undefined): boolean => {
  return role === 'Support';
};

/**
 * Get the role category from a UserRole
 */
export const getRoleCategory = (role: UserRole | null | undefined): RoleCategory | null => {
  if (!role) return null;
  if (isIndustryRole(role)) return 'industry';
  if (isProfessionalRole(role)) return 'professional';
  if (isVendorRole(role)) return 'vendor';
  if (isAdminRole(role)) return 'admin';
  if (isSupportRole(role)) return 'support';
  return null;
};

/**
 * Convert RoleCategory to display name
 */
export const getRoleCategoryDisplayName = (category: RoleCategory): string => {
  const names: Record<RoleCategory, string> = {
    industry: 'Industry',
    professional: 'Professional',
    vendor: 'Vendor',
    admin: 'Admin',
    support: 'Support'
  };
  return names[category];
};
