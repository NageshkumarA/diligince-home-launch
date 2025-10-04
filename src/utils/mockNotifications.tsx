import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification, NotificationState, NotificationPreferences } from '@/types/notifications';
import { useLocation } from 'react-router-dom';

// --- MOCK NOTIFICATIONS (Updated) ---
// Note the changes in 'actionUrl' to support your requirements.
// - Requirement URLs now use query params to trigger a popup (e.g., ?view=...&action=...).
// - Message URLs now point to specific conversation threads.
// - 'logistics-vendor' userType is used to match the provider logic.

export const mockNotifications: Notification[] = [
  // --- Industry Notifications ---
  {
    id: '1',
    title: 'New Requirement Submitted',
    message: 'Industrial Valve Procurement requirement has been submitted for review.',
    type: 'info',
    priority: 'medium',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    userType: 'industry',
    category: 'Requirements',
    actionUrl: '/industry-requirements/req-001'
  },
  {
    id: '2',
    title: 'Purchase Order Approved',
    message: 'Your purchase order PO-2023-042 has been approved and is ready for processing.',
    type: 'success',
    priority: 'high',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: false,
    userType: 'industry',
    category: 'Purchase Orders',
    actionUrl: '/industry-workflows/po-2023-042'
  },
  {
    id: '3',
    title: 'New Message Received',
    message: 'You have received a new message from TechValve Solutions.',
    type: 'info',
    priority: 'low',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
    userType: 'industry',
    category: 'Messages',
    actionUrl: '/industry-messages/thread/techvalve-solutions'
  },

  // --- Product Vendor Notifications ---
  {
    id: '4',
    title: 'New Product Requirement Available',
    message: 'A new requirement for "Industrial Pumps" from MegaCorp Industries is available. Express your interest.',
    type: 'info',
    priority: 'high',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: false,
    userType: 'product-vendor',
    category: 'Requirements',
    actionUrl: '/vendor-requirements?view=prod-1&action=showInterest'
  },
  {
    id: '5',
    title: 'Requirement Matched: Steel Pipes',
    message: 'Your profile matches a new requirement for "High-Grade Steel Pipes" from Global Constructions. View details to express interest.',
    type: 'info',
    priority: 'medium',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
    userType: 'product-vendor',
    category: 'Requirements',
    actionUrl: '/vendor-requirements?view=prod-2&action=showInterest'
  },
  {
    id: '6',
    title: 'New Message from MegaCorp Industries',
    message: 'You have a new query regarding your quote for "Industrial Pumps".',
    type: 'info',
    priority: 'medium',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: false,
    userType: 'product-vendor',
    category: 'Messages',
    actionUrl: '/vendor-messages/thread/megacorp-industries'
  },

  // --- Service Vendor Notifications ---
  {
    id: '7',
    title: 'New Service Requirement: CNC Maintenance',
    message: 'A new requirement for "Annual CNC Machine Maintenance" is available from Precision Parts Inc. Express your interest.',
    type: 'info',
    priority: 'high',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    read: false,
    userType: 'service-vendor',
    category: 'Requirements',
    actionUrl: '/vendor-requirements?view=serv-1&action=showInterest'
  },
  {
    id: '8',
    title: 'Requirement Matched: Electrical Auditing',
    message: 'A new requirement for "Factory Electrical Safety Audit" from Global Manufacturing matches your services.',
    type: 'info',
    priority: 'medium',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: false,
    userType: 'service-vendor',
    category: 'Requirements',
    actionUrl: '/vendor-requirements?view=serv-2&action=showInterest'
  },
  {
    id: '9',
    title: 'New Message from Precision Parts Inc.',
    message: 'You have received a new message regarding your availability for the CNC maintenance contract.',
    type: 'info',
    priority: 'low',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    userType: 'service-vendor',
    category: 'Messages',
    actionUrl: '/vendor-messages/thread/precision-parts-inc'
  },

  // --- Logistics Vendor Notifications ---
  {
    id: '10',
    title: 'New Logistics Request: Heavy Machinery Transport',
    message: 'MegaCorp Industries requires transport for heavy machinery. View details and submit your quote.',
    type: 'info',
    priority: 'high',
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    read: false,
    userType: 'logistics-vendor', // Corrected userType
    category: 'Requirements',
    actionUrl: '/vendor-requirements?view=log-1&action=showInterest'
  },
  {
    id: '11',
    title: 'New Shipment Available: Bulk Chemicals',
    message: 'A new shipment from "Chem Solutions" to "Pharma Co." is available for bidding. Express your interest.',
    type: 'info',
    priority: 'medium',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    read: true,
    userType: 'logistics-vendor', // Corrected userType
    category: 'Requirements',
    actionUrl: '/vendor-requirements?view=log-2&action=showInterest'
  },
  {
    id: '12',
    title: 'New Message from Chem Solutions',
    message: 'You have a message regarding the required documentation for the bulk chemicals transport.',
    type: 'info',
    priority: 'medium',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    read: false,
    userType: 'logistics-vendor', // Corrected userType
    category: 'Messages',
    actionUrl: '/vendor-messages/thread/chem-solutions'
  }
];

// --- NOTIFICATION STORE CONTEXT PROVIDER (Unchanged) ---

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

// (mockNotifications array and imports remain the same)

export const NotificationStoreProvider: React.FC<NotificationStoreProviderProps> = ({ children }) => {
  const location = useLocation();

  // 1. Store ALL notifications in state. Initialize only once.
  const [allNotifications, setAllNotifications] = useState<Notification[]>(mockNotifications);

  // 2. State for preferences (if you need to modify them later)
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    showCount: true,
    enableSound: true,
    categories: {}
  });

  // Determine user type from current route
  const getUserType = (): Notification['userType'] => {
    const path = location.pathname;
    if (path.includes('professional')) return 'professional';
    if (path.includes('service-vendor')) return 'service-vendor';
    if (path.includes('product-vendor')) return 'product-vendor';
    if (path.includes('logistics-vendor')) return 'logistics-vendor';
    return 'industry';
  };

  const currentUserType = getUserType();

  // 3. Use useMemo to DERIVE the user's visible notifications from the master list.
  // This recalculates efficiently only when the master list or user type changes.
  const userNotifications = React.useMemo(() => {
    return allNotifications.filter(n => n.userType === currentUserType);
  }, [allNotifications, currentUserType]);

  const unreadCount = React.useMemo(() => {
    return userNotifications.filter(n => !n.read).length;
  }, [userNotifications]);

  // 4. All modification functions now update the MASTER `allNotifications` list.
  const markAsRead = (id: string) => {
    setAllNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setAllNotifications(prev =>
      prev.map(n => (n.userType === currentUserType ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setAllNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationsByCategory = (category: string) => {
    return userNotifications.filter(n => n.category === category);
  };

  const getRecentNotifications = (limit: number = 5) => {
    return userNotifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  };

  const value: NotificationStoreContextType = {
    // 5. Provide the derived values to consumers.
    notifications: userNotifications,
    unreadCount,
    preferences,
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

// (useNotificationStore hook remains the same)

export const useNotificationStore = (): NotificationStoreContextType => {
  const context = useContext(NotificationStoreContext);
  if (context === undefined) {
    throw new Error('useNotificationStore must be used within a NotificationStoreProvider');
  }
  return context;
};

  // --- Logistic Vendor Notifications ---
  // {
  //   id: '10',
  //   title: 'New Logistics Request: Heavy Machinery Transport',
  //   message: 'MegaCorp Industries requires transport for heavy machinery. View details and submit your quote.',
  //   type: 'info',
  //   priority: 'high',
  //   timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
  //   read: false,
  //   userType: 'logistic-vendor',
  //   category: 'Requirements',
  //   actionUrl: '/vendor-requirements/log-1'
  // },
  // {
  //   id: '11',
  //   title: 'New Shipment Available: Bulk Chemicals',
  //   message: 'A new shipment from "Chem Solutions" to "Pharma Co." is available for bidding. Express your interest.',
  //   type: 'info',
  //   priority: 'medium',
  //   timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
  //   read: true,
  //   userType: 'logistic-vendor',
  //   category: 'Requirements',
  //   actionUrl: '/vendor-requirements/log-2'
  // },
  // {
  //   id: '12',
  //   title: 'New Message from Chem Solutions',
  //   message: 'You have a message regarding the required documentation for the bulk chemicals transport.',
  //   type: 'info',
  //   priority: 'medium',
  //   timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  //   read: false,
  //   userType: 'logistic-vendor',
  //   category: 'Messages',
  //   actionUrl: '/vendor-messages'
  // }

