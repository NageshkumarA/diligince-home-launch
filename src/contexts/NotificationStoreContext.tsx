
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification, NotificationState, NotificationPreferences } from '@/types/notifications';
import { mockNotifications } from '@/utils/mockNotifications';
import { useLocation } from 'react-router-dom';

interface NotificationStoreContextType {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  getNotificationsByCategory: (category: string) => Notification[];
  getRecentNotifications: (limit?: number) => Notification[];
}

const NotificationStoreContext = createContext<NotificationStoreContextType | undefined>(undefined);

interface NotificationStoreProviderProps {
  children: ReactNode;
}

export const NotificationStoreProvider: React.FC<NotificationStoreProviderProps> = ({ children }) => {
  const location = useLocation();
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    unreadCount: 0,
    preferences: {
      showCount: true,
      enableSound: true,
      categories: {}
    }
  });

  // Determine user type from current route
  const getUserType = (): NotificationState['notifications'][0]['userType'] => {
    const path = location.pathname;
    if (path.includes('professional')) return 'professional';
    if (path.includes('service-vendor')) return 'service-vendor';
    if (path.includes('product-vendor')) return 'product-vendor';
    if (path.includes('logistics-vendor')) return 'logistics-vendor';
    return 'industry';
  };

  // Initialize notifications based on user type
  useEffect(() => {
    const userType = getUserType();
    const userNotifications = mockNotifications.filter(n => n.userType === userType);
    const unreadCount = userNotifications.filter(n => !n.read).length;
    
    setState(prev => ({
      ...prev,
      notifications: userNotifications,
      unreadCount
    }));
  }, [location.pathname]);

  const markAsRead = (id: string) => {
    setState(prev => {
      const updatedNotifications = prev.notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      );
      const unreadCount = updatedNotifications.filter(n => !n.read).length;
      return {
        ...prev,
        notifications: updatedNotifications,
        unreadCount
      };
    });
  };

  const markAllAsRead = () => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }));
  };

  const deleteNotification = (id: string) => {
    setState(prev => {
      const updatedNotifications = prev.notifications.filter(n => n.id !== id);
      const unreadCount = updatedNotifications.filter(n => !n.read).length;
      return {
        ...prev,
        notifications: updatedNotifications,
        unreadCount
      };
    });
  };

  const getNotificationsByCategory = (category: string) => {
    return state.notifications.filter(n => n.category === category);
  };

  const getRecentNotifications = (limit: number = 5) => {
    return state.notifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  };

  const value: NotificationStoreContextType = {
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    preferences: state.preferences,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getNotificationsByCategory,
    getRecentNotifications
  };

  return (
    <NotificationStoreContext.Provider value={value}>
      {children}
    </NotificationStoreContext.Provider>
  );
};

export const useNotificationStore = (): NotificationStoreContextType => {
  const context = useContext(NotificationStoreContext);
  if (context === undefined) {
    throw new Error('useNotificationStore must be used within a NotificationStoreProvider');
  }
  return context;
};
