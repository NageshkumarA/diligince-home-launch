
// Shared type definitions for common interfaces across the application

export interface BaseEntity {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
}

// Message interfaces
export interface BaseMessage extends BaseEntity {
  sender: string;
  initials: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  color: string;
  unread: boolean;
  type: string;
}

export interface MessageFilter {
  key: string;
  label: string;
}

export interface MessageTypeConfig {
  label: string;
  icon: string;
  color: string;
}

// Stats interfaces
export interface StatItem {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  bgColor: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

// Modal interfaces
export interface BaseModal {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ConfirmationModalProps extends BaseModal {
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

export interface FormModalProps extends BaseModal {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  submitText?: string;
  isLoading?: boolean;
}

// Navigation interfaces
export interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

// User interfaces
export interface BaseUser extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'pending';
}

export type UserRole = 'industry' | 'expert' | 'vendor' | 'admin';

export interface UserProfile extends BaseUser {
  phone?: string;
  location?: string;
  bio?: string;
  preferences: UserPreferences;
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

// Notification interfaces
export interface BaseNotification extends BaseEntity {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  action?: NotificationAction;
}

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

// Project/Job interfaces
export interface BaseProject extends BaseEntity {
  title: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  deadline?: string;
  budget?: string;
  client?: string;
  tags?: string[];
}

export type ProjectStatus = 'draft' | 'open' | 'in-progress' | 'review' | 'completed' | 'cancelled';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// Form interfaces
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date';
  placeholder?: string;
  required?: boolean;
  options?: FormOption[];
  validation?: FormValidation;
}

export interface FormOption {
  value: string;
  label: string;
}

export interface FormValidation {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

// API interfaces
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  errors?: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// Theme interfaces
export interface ThemeConfig {
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  breakpoints: ThemeBreakpoints;
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

export interface ThemeFonts {
  heading: string;
  body: string;
  mono: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}
