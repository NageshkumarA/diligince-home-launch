
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
  primary: 'bg-[#722ed1] text-white',
  secondary: 'bg-[#faad14] text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-orange-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-600 text-white',
  neutral: 'bg-gray-600 text-white',
};

export const getBadgeColors = (variant: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'bg-[#722ed1]/10 text-[#722ed1] border-[#722ed1]/20',
    secondary: 'bg-[#faad14]/10 text-[#faad14] border-[#faad14]/20',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-orange-100 text-orange-800 border-orange-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  
  return colorMap[variant] || colorMap.neutral;
};

export const getButtonColors = (variant: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'bg-[#722ed1] hover:bg-[#722ed1]/90 text-white',
    secondary: 'bg-[#faad14] hover:bg-[#faad14]/90 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warning: 'bg-orange-600 hover:bg-orange-700 text-white',
    error: 'bg-red-600 hover:bg-red-700 text-white',
    info: 'bg-blue-600 hover:bg-blue-700 text-white',
    neutral: 'bg-gray-600 hover:bg-gray-700 text-white',
  };
  
  return colorMap[variant] || colorMap.neutral;
};

export const getTextColors = (variant: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'text-[#722ed1]',
    secondary: 'text-[#faad14]',
    success: 'text-green-600',
    warning: 'text-orange-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    neutral: 'text-gray-600',
  };
  
  return colorMap[variant] || colorMap.neutral;
};

export const getHoverColors = (variant: keyof ThemeColors): string => {
  const colorMap: Record<keyof ThemeColors, string> = {
    primary: 'hover:bg-[#722ed1]/10',
    secondary: 'hover:bg-[#faad14]/10',
    success: 'hover:bg-green-50',
    warning: 'hover:bg-orange-50',
    error: 'hover:bg-red-50',
    info: 'hover:bg-blue-50',
    neutral: 'hover:bg-gray-50',
  };
  
  return colorMap[variant] || colorMap.neutral;
};
