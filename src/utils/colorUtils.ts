
// Color theme utilities for consistent theming across the application

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  neutral: string;
}

export const themeColors: ThemeColors = {
  primary: 'bg-corporate-navy-500 text-white',
  secondary: 'bg-corporate-gray-500 text-white',
  success: 'bg-corporate-success-500 text-white',
  warning: 'bg-corporate-warning-500 text-corporate-gray-900',
  error: 'bg-corporate-danger-500 text-white',
  info: 'bg-corporate-info-500 text-white',
  neutral: 'bg-corporate-gray-500 text-white',
};

// User type color utilities
export const getUserTypeColors = (userType: 'industry' | 'professional' | 'vendor' | 'admin'): string => {
  const colorMap = {
    industry: 'bg-industry-500 text-industry-foreground',
    professional: 'bg-[#722ed1] text-white',
    vendor: 'bg-vendor-500 text-vendor-foreground',
    admin: 'bg-admin-500 text-admin-foreground',
  };
  
  return colorMap[userType] || colorMap.industry;
};

export const getUserTypeBadgeColors = (userType: 'industry' | 'professional' | 'vendor' | 'admin'): string => {
  const colorMap = {
    industry: 'bg-industry-100 text-industry-800 border-industry-200',
    professional: 'bg-purple-100 text-purple-800 border-purple-200',
    vendor: 'bg-vendor-100 text-vendor-800 border-vendor-200',
    admin: 'bg-admin-100 text-admin-800 border-admin-200',
  };
  
  return colorMap[userType] || colorMap.industry;
};

export const getBadgeColors = (variant: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'bg-corporate-navy-100 text-corporate-navy-700 border-corporate-navy-200',
    secondary: 'bg-corporate-gray-100 text-corporate-gray-700 border-corporate-gray-200',
    success: 'bg-corporate-success-100 text-corporate-success-700 border-corporate-success-100',
    warning: 'bg-corporate-warning-100 text-corporate-warning-700 border-corporate-warning-100',
    error: 'bg-corporate-danger-100 text-corporate-danger-700 border-corporate-danger-100',
    info: 'bg-corporate-info-100 text-corporate-info-700 border-corporate-info-100',
    neutral: 'bg-corporate-gray-100 text-corporate-gray-700 border-corporate-gray-200',
  };
  
  return colorMap[variant] || colorMap.neutral;
};

export const getButtonColors = (variant: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'bg-corporate-navy-500 hover:bg-corporate-navy-600 text-white',
    secondary: 'bg-corporate-gray-500 hover:bg-corporate-gray-600 text-white',
    success: 'bg-corporate-success-500 hover:bg-corporate-success-600 text-white',
    warning: 'bg-corporate-warning-500 hover:bg-corporate-warning-600 text-corporate-gray-900',
    error: 'bg-corporate-danger-500 hover:bg-corporate-danger-600 text-white',
    info: 'bg-corporate-info-500 hover:bg-corporate-info-600 text-white',
    neutral: 'bg-corporate-gray-500 hover:bg-corporate-gray-600 text-white',
  };
  
  return colorMap[variant] || colorMap.neutral;
};

export const getTextColors = (variant: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-primary',
    neutral: 'text-gray-600',
  };
  
  return colorMap[variant] || colorMap.neutral;
};

export const getHoverColors = (variant: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'hover:bg-primary/10',
    secondary: 'hover:bg-secondary/10',
    success: 'hover:bg-green-50',
    warning: 'hover:bg-yellow-50',
    error: 'hover:bg-red-50',
    info: 'hover:bg-primary/5',
    neutral: 'hover:bg-gray-50',
  };
  
  return colorMap[variant] || colorMap.neutral;
};

// Status color utilities
export const getStatusColors = (status: string): string => {
  const statusMap: Record<string, string> = {
    success: 'text-green-600',
    completed: 'text-green-600',
    active: 'text-green-600',
    warning: 'text-yellow-600',
    pending: 'text-yellow-600',
    error: 'text-red-600',
    failed: 'text-red-600',
    cancelled: 'text-red-600',
    info: 'text-primary',
    draft: 'text-gray-600',
    inactive: 'text-gray-600',
  };
  
  return statusMap[status.toLowerCase()] || statusMap.info;
};

// Semantic color functions for consistent theming
export const getSemanticColors = () => ({
  success: 'hsl(var(--status-success))',
  warning: 'hsl(var(--status-warning))',
  error: 'hsl(var(--status-error))',
  info: 'hsl(var(--status-info))',
  pending: 'hsl(var(--status-pending))',
});
