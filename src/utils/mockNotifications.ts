
import { Notification } from '@/types/notifications';

export const mockNotifications: Notification[] = [
  // Professional notifications
  {
    id: '1',
    title: 'New Job Opportunity',
    message: 'Steel Manufacturing Ltd. has posted a new PLC automation project that matches your skills.',
    type: 'info',
    priority: 'high',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    read: false,
    userType: 'professional',
    category: 'Job Opportunities',
    actionUrl: '/professional-opportunities',
    icon: 'Briefcase'
  },
  {
    id: '2',
    title: 'Meeting Reminder',
    message: 'Client consultation call with AutoParts Manufacturing in 1 hour.',
    type: 'warning',
    priority: 'urgent',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    read: false,
    userType: 'professional',
    category: 'Calendar',
    actionUrl: '/professional-calendar',
    icon: 'Calendar'
  },
  {
    id: '3',
    title: 'Message Received',
    message: 'New message from Chemical Processing Corp regarding safety audit.',
    type: 'info',
    priority: 'medium',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    userType: 'professional',
    category: 'Messages',
    actionUrl: '/professional-messages',
    icon: 'MessageSquare'
  },

  // Service Vendor notifications
  {
    id: '4',
    title: 'New RFQ Available',
    message: 'Textile Mills Inc has posted an RFQ for automation consulting services.',
    type: 'info',
    priority: 'high',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
    read: false,
    userType: 'service-vendor',
    category: 'RFQs',
    actionUrl: '/service-vendor-rfqs',
    icon: 'FileText'
  },
  {
    id: '5',
    title: 'Project Milestone Due',
    message: 'Control system upgrade project milestone due in 2 days.',
    type: 'warning',
    priority: 'high',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: false,
    userType: 'service-vendor',
    category: 'Projects',
    actionUrl: '/service-vendor-projects',
    icon: 'Clock'
  },
  {
    id: '6',
    title: 'Payment Received',
    message: 'Payment of $15,000 received for Steel Plant automation project.',
    type: 'success',
    priority: 'medium',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    userType: 'service-vendor',
    category: 'Payments',
    actionUrl: '/service-vendor-dashboard',
    icon: 'DollarSign'
  },

  // Logistics Vendor notifications
  {
    id: '7',
    title: 'Urgent Transport Request',
    message: 'Steel Industries Ltd. needs immediate transport for 50 tons of steel plates.',
    type: 'warning',
    priority: 'urgent',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
    read: false,
    userType: 'logistics-vendor',
    category: 'Transport Requests',
    actionUrl: '/logistics-vendor-requests',
    icon: 'Truck'
  },
  {
    id: '8',
    title: 'Vehicle Maintenance Alert',
    message: 'Truck FL-001 requires scheduled maintenance in 3 days.',
    type: 'warning',
    priority: 'medium',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    userType: 'logistics-vendor',
    category: 'Fleet Management',
    actionUrl: '/logistics-vendor-fleet',
    icon: 'AlertTriangle'
  },
  {
    id: '9',
    title: 'Delivery Completed',
    message: 'Hazmat delivery to Chemical Corp completed successfully.',
    type: 'success',
    priority: 'low',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
    userType: 'logistics-vendor',
    category: 'Deliveries',
    actionUrl: '/logistics-vendor-deliveries',
    icon: 'CheckCircle'
  },

  // Product Vendor notifications
  {
    id: '10',
    title: 'New Order Received',
    message: 'Manufacturing Hub placed an order for 500 industrial sensors.',
    type: 'success',
    priority: 'high',
    timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 min ago
    read: false,
    userType: 'product-vendor',
    category: 'Orders',
    actionUrl: '/product-vendor-orders',
    icon: 'ShoppingCart'
  },
  {
    id: '11',
    title: 'Stock Alert',
    message: 'Pressure sensors inventory running low - only 25 units remaining.',
    type: 'warning',
    priority: 'medium',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: false,
    userType: 'product-vendor',
    category: 'Inventory',
    actionUrl: '/product-vendor-catalog',
    icon: 'Package'
  },

  // Industry notifications
  {
    id: '12',
    title: 'Vendor Proposal Received',
    message: 'TechnoServ Solutions submitted a proposal for your automation project.',
    type: 'info',
    priority: 'medium',
    timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
    read: false,
    userType: 'industry',
    category: 'Proposals',
    actionUrl: '/industry-dashboard',
    icon: 'FileText'
  }
];
