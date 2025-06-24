
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
  read: boolean;
  userType: 'professional' | 'service-vendor' | 'product-vendor' | 'logistics-vendor' | 'industry';
  category: string;
  actionUrl?: string;
  icon?: string;
}

export interface NotificationPreferences {
  showCount: boolean;
  enableSound: boolean;
  categories: {
    [key: string]: boolean;
  };
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
}
