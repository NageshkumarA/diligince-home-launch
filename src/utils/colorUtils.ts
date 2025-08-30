
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
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-primary text-white',
  neutral: 'bg-gray-600 text-white',
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
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-primary/10 text-primary border-primary/20',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  
  return colorMap[variant] || colorMap.neutral;
};

export const getButtonColors = (variant: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    error: 'bg-red-600 hover:bg-red-700 text-white',
    info: 'bg-primary hover:bg-primary/90 text-white',
    neutral: 'bg-gray-600 hover:bg-gray-700 text-white',
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
