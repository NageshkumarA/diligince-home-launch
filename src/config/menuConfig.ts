import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  BarChart3, 
  Settings,
  Briefcase,
  MessageSquare,
  Quote,
  Workflow,
  Plus,
  List,
  Archive,
  Users,
  User,
  LogOut,
  GitPullRequestDraft,
  CheckCircle,
  Clock,
  Building,
  CreditCard,
  Shield,
  Calendar,
  Truck,
  Package,
  Factory,
  UserCheck,
  FileCheck,
  Globe,
  Mail,
  Bell,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  SortAsc,
  Activity,
  TrendingUp,
  PieChart,
  DollarSign,
  ShoppingCart,
  Clipboard,
  BookOpen,
  Award,
  Target,
  Zap,
  Layers,
  Database,
  Bookmark
} from 'lucide-react';

interface MenuItem {
  icon: any;
  label: string;
  path: string;
  submenu?: {
    icon: any;
    label: string;
    path: string;
    onClick?: () => void;
  }[];
}

interface MenuConfig {
  industry: MenuItem[];
  professional: MenuItem[];
  vendor: MenuItem[];
  'service-vendor': MenuItem[];
  'product-vendor': MenuItem[];
  'logistics-vendor': MenuItem[];
}

export const menuConfig: MenuConfig = {
  industry: [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/industry-dashboard' 
    },
    { 
      icon: FileText, 
      label: 'Requirements', 
      path: '/industry-requirements',
      submenu: [
        { icon: Edit, label: 'Create New', path: '/create-requirement' },
        { icon: GitPullRequestDraft, label: 'Drafts', path: '/requirements/drafts' },
        { icon: Clock, label: 'Pending Approval', path: '/requirements/pending' },
        { icon: CheckCircle, label: 'Approved', path: '/requirements/approved' },
        { icon: Globe, label: 'Published', path: '/requirements/published' },
        { icon: Archive, label: 'Archived', path: '/requirements/archived' }
      ]
    },
    {
      icon: Quote,
      label: 'Quotations',
      path: '/quotations',
      submenu: [
        { icon: Eye, label: 'All Quotations', path: '/quotations' },
        { icon: Clock, label: 'Pending Review', path: '/quotations/pending' },
        { icon: CheckCircle, label: 'Approved', path: '/quotations/approved' },
        { icon: BarChart3, label: 'Comparison', path: '/quotations/comparison' }
      ]
    },
    {
      icon: ShoppingCart,
      label: 'Purchase Orders',
      path: '/purchase-orders',
      submenu: [
        { icon: Plus, label: 'Create PO', path: '/create-purchase-order' },
        { icon: List, label: 'All Orders', path: '/purchase-orders' },
        { icon: Clock, label: 'Pending', path: '/purchase-orders/pending' },
        { icon: Activity, label: 'In Progress', path: '/purchase-orders/in-progress' },
        { icon: CheckCircle, label: 'Completed', path: '/purchase-orders/completed' }
      ]
    },
    { 
      icon: Workflow, 
      label: 'Project Workflows', 
      path: '/industry-project-workflow',
      submenu: [
        { icon: List, label: 'All Projects', path: '/workflows' },
        { icon: Activity, label: 'Active Projects', path: '/workflows/active' },
        { icon: Calendar, label: 'Timeline View', path: '/workflows/timeline' },
        { icon: TrendingUp, label: 'Progress Reports', path: '/workflows/reports' }
      ]
    },
    {
      icon: Users,
      label: 'Stakeholders',
      path: '/industry-stakeholders',
      submenu: [
        { icon: Building, label: 'Vendors', path: '/stakeholders/vendors' },
        { icon: UserCheck, label: 'Professionals', path: '/stakeholders/professionals' },
        { icon: Plus, label: 'Invite New', path: '/stakeholders/invite' },
        { icon: Shield, label: 'Access Control', path: '/stakeholders/access' }
      ]
    },
    { 
      icon: MessageSquare, 
      label: 'Messages', 
      path: '/industry-messages',
      submenu: [
        { icon: Mail, label: 'All Messages', path: '/messages' },
        { icon: Bell, label: 'Notifications', path: '/messages/notifications' },
        { icon: Users, label: 'Group Chats', path: '/messages/groups' }
      ]
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      path: '/analytics',
      submenu: [
        { icon: TrendingUp, label: 'Performance', path: '/analytics/performance' },
        { icon: DollarSign, label: 'Spending Analysis', path: '/analytics/spending' },
        { icon: PieChart, label: 'Vendor Reports', path: '/analytics/vendors' },
        { icon: Activity, label: 'Project Metrics', path: '/analytics/projects' }
      ]
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      submenu: [
        { icon: Building, label: 'Company Profile', path: '/industry-profile' },
        { icon: Users, label: 'Team Members', path: '/settings/members' },
        { icon: Shield, label: 'Role Management', path: '/dashboard/role-management' },
        { icon: Shield, label: 'Approval Matrix', path: '/industry-approval-matrix' },
        { icon: CreditCard, label: 'Payment Settings', path: '/settings/payments' },
        { icon: Workflow, label: 'Workflow Templates', path: '/settings/workflows' },
        { icon: Database, label: 'Data Management', path: '/settings/data' },
        { icon: User, label: 'Personal Info', path: '/settings/personal' },
        { icon: Bell, label: 'Notifications', path: '/settings/notifications' },
        { icon: Shield, label: 'Privacy & Security', path: '/settings/privacy' }
      ]
    }
  ],

  professional: [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/professional-dashboard' 
    },
    { 
      icon: Briefcase, 
      label: 'Opportunities', 
      path: '/professional-opportunities',
      submenu: [
        { icon: Search, label: 'Browse Jobs', path: '/opportunities' },
        { icon: Bookmark, label: 'Saved Jobs', path: '/opportunities/saved' },
        { icon: Clock, label: 'Applications', path: '/opportunities/applications' },
        { icon: CheckCircle, label: 'Accepted', path: '/opportunities/accepted' }
      ]
    },
    {
      icon: Clipboard,
      label: 'My Projects',
      path: '/projects',
      submenu: [
        { icon: Activity, label: 'Active Projects', path: '/projects/active' },
        { icon: Clock, label: 'Pending Start', path: '/projects/pending' },
        { icon: CheckCircle, label: 'Completed', path: '/projects/completed' },
        { icon: Calendar, label: 'Schedule', path: '/projects/schedule' }
      ]
    },
    {
      icon: Calendar,
      label: 'Availability',
      path: '/professional-calendar',
      submenu: [
        { icon: Calendar, label: 'Calendar View', path: '/calendar' },
        { icon: Clock, label: 'Time Slots', path: '/calendar/slots' },
        { icon: Settings, label: 'Preferences', path: '/calendar/preferences' }
      ]
    },
    { 
      icon: MessageSquare, 
      label: 'Messages', 
      path: '/professional-messages',
      submenu: [
        { icon: Mail, label: 'All Messages', path: '/messages' },
        { icon: Building, label: 'Client Messages', path: '/messages/clients' },
        { icon: Bell, label: 'Notifications', path: '/messages/notifications' }
      ]
    },
    {
      icon: Award,
      label: 'Portfolio',
      path: '/portfolio',
      submenu: [
        { icon: Eye, label: 'View Portfolio', path: '/portfolio' },
        { icon: Edit, label: 'Edit Profile', path: '/professional-profile' },
        { icon: BookOpen, label: 'Certifications', path: '/portfolio/certifications' },
        { icon: TrendingUp, label: 'Performance', path: '/portfolio/performance' }
      ]
    },
    { 
      icon: BarChart3, 
      label: 'Reports', 
      path: '/reports',
      submenu: [
        { icon: DollarSign, label: 'Earnings', path: '/reports/earnings' },
        { icon: Activity, label: 'Project History', path: '/reports/projects' },
        { icon: TrendingUp, label: 'Performance', path: '/reports/performance' }
      ]
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      submenu: [
        { icon: User, label: 'Personal Info', path: '/settings/personal' },
        { icon: CreditCard, label: 'Payment Methods', path: '/settings/payments' },
        { icon: Bell, label: 'Notifications', path: '/settings/notifications' },
        { icon: Shield, label: 'Privacy', path: '/settings/privacy' }
      ]
    }
  ],

  vendor: [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/service-vendor-dashboard' 
    },
    { 
      icon: FileText, 
      label: 'RFQs', 
      path: '/service-vendor-rfqs',
      submenu: [
        { icon: Search, label: 'Browse RFQs', path: '/rfqs' },
        { icon: Clock, label: 'Submitted Quotes', path: '/rfqs/submitted' },
        { icon: CheckCircle, label: 'Won Projects', path: '/rfqs/won' },
        { icon: Archive, label: 'Archived', path: '/rfqs/archived' }
      ]
    },
    {
      icon: Clipboard,
      label: 'Projects',
      path: '/service-vendor-projects',
      submenu: [
        { icon: Activity, label: 'Active Projects', path: '/projects/active' },
        { icon: Clock, label: 'Pending Start', path: '/projects/pending' },
        { icon: CheckCircle, label: 'Completed', path: '/projects/completed' },
        { icon: Calendar, label: 'Timeline', path: '/projects/timeline' }
      ]
    },
    {
      icon: Users,
      label: 'Team Management',
      path: '/team',
      submenu: [
        { icon: Users, label: 'Team Members', path: '/team/members' },
        { icon: Calendar, label: 'Availability', path: '/team/availability' },
        { icon: Award, label: 'Skills Matrix', path: '/team/skills' },
        { icon: Plus, label: 'Add Member', path: '/team/add' }
      ]
    },
    { 
      icon: MessageSquare, 
      label: 'Messages', 
      path: '/service-vendor-messages',
      submenu: [
        { icon: Mail, label: 'All Messages', path: '/messages' },
        { icon: Building, label: 'Client Messages', path: '/messages/clients' },
        { icon: Users, label: 'Team Chat', path: '/messages/team' }
      ]
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      path: '/analytics',
      submenu: [
        { icon: TrendingUp, label: 'Performance', path: '/analytics/performance' },
        { icon: DollarSign, label: 'Revenue', path: '/analytics/revenue' },
        { icon: Target, label: 'Success Rate', path: '/analytics/success' }
      ]
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      submenu: [
        { icon: Building, label: 'Company Profile', path: '/service-vendor-profile' },
        { icon: Zap, label: 'Services & Skills', path: '/settings/services' },
        { icon: Shield, label: 'Role Management', path: '/dashboard/role-management' },
        { icon: CreditCard, label: 'Payment Settings', path: '/settings/payments' },
        { icon: Award, label: 'Certifications', path: '/settings/certifications' },
        { icon: User, label: 'Personal Info', path: '/settings/personal' },
        { icon: Bell, label: 'Notifications', path: '/settings/notifications' },
        { icon: Shield, label: 'Privacy & Security', path: '/settings/privacy' }
      ]
    }
  ],

  'service-vendor': [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/service-vendor-dashboard' 
    },
    { 
      icon: FileText, 
      label: 'RFQs & Quotes', 
      path: '/service-vendor-rfqs',
      submenu: [
        { icon: Search, label: 'Browse RFQs', path: '/rfqs/browse' },
        { icon: Edit, label: 'Create Quote', path: '/rfqs/create-quote' },
        { icon: Clock, label: 'Pending Quotes', path: '/rfqs/pending' },
        { icon: CheckCircle, label: 'Accepted', path: '/rfqs/accepted' },
        { icon: Archive, label: 'Archived', path: '/rfqs/archived' }
      ]
    },
    {
      icon: Clipboard,
      label: 'Projects',
      path: '/service-vendor-projects',
      submenu: [
        { icon: Activity, label: 'Active Projects', path: '/projects/active' },
        { icon: Clock, label: 'Starting Soon', path: '/projects/upcoming' },
        { icon: CheckCircle, label: 'Completed', path: '/projects/completed' },
        { icon: Calendar, label: 'Project Calendar', path: '/projects/calendar' },
        { icon: BarChart3, label: 'Progress Reports', path: '/projects/reports' }
      ]
    },
    {
      icon: Users,
      label: 'Team & Resources',
      path: '/team',
      submenu: [
        { icon: Users, label: 'Team Members', path: '/team/members' },
        { icon: Calendar, label: 'Team Availability', path: '/team/availability' },
        { icon: Award, label: 'Skills & Expertise', path: '/team/skills' },
        { icon: TrendingUp, label: 'Performance', path: '/team/performance' }
      ]
    },
    {
      icon: Layers,
      label: 'Service Portfolio',
      path: '/services',
      submenu: [
        { icon: List, label: 'All Services', path: '/services/all' },
        { icon: Plus, label: 'Add Service', path: '/services/add' },
        { icon: Award, label: 'Specializations', path: '/services/specializations' },
        { icon: Eye, label: 'Portfolio View', path: '/services/portfolio' }
      ]
    },
    { 
      icon: MessageSquare, 
      label: 'Communication', 
      path: '/service-vendor-messages',
      submenu: [
        { icon: Mail, label: 'All Messages', path: '/messages' },
        { icon: Building, label: 'Client Communications', path: '/messages/clients' },
        { icon: Users, label: 'Internal Team Chat', path: '/messages/internal' },
        { icon: Bell, label: 'Notifications', path: '/messages/notifications' }
      ]
    },
    { 
      icon: BarChart3, 
      label: 'Business Analytics', 
      path: '/analytics',
      submenu: [
        { icon: TrendingUp, label: 'Business Growth', path: '/analytics/growth' },
        { icon: DollarSign, label: 'Revenue Analytics', path: '/analytics/revenue' },
        { icon: Target, label: 'Win Rate Analysis', path: '/analytics/win-rate' },
        { icon: PieChart, label: 'Service Performance', path: '/analytics/services' }
      ]
    },
    { 
      icon: Settings, 
      label: 'Company Settings', 
      path: '/settings',
      submenu: [
        { icon: Building, label: 'Company Profile', path: '/service-vendor-profile' },
        { icon: Zap, label: 'Services Management', path: '/settings/services' },
        { icon: Award, label: 'Certifications', path: '/settings/certifications' },
        { icon: CreditCard, label: 'Payment & Billing', path: '/settings/billing' },
        { icon: Shield, label: 'Security Settings', path: '/settings/security' }
      ]
    }
  ],

  'product-vendor': [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/product-vendor-dashboard' 
    },
    {
      icon: Package,
      label: 'Product Catalog',
      path: '/product-vendor-catalog',
      submenu: [
        { icon: List, label: 'All Products', path: '/catalog/products' },
        { icon: Plus, label: 'Add Product', path: '/catalog/add-product' },
        { icon: Edit, label: 'Bulk Edit', path: '/catalog/bulk-edit' },
        { icon: Eye, label: 'Catalog Preview', path: '/catalog/preview' },
        { icon: Archive, label: 'Archived Products', path: '/catalog/archived' }
      ]
    },
    { 
      icon: FileText, 
      label: 'RFQs & Quotes', 
      path: '/product-vendor-rfqs',
      submenu: [
        { icon: Search, label: 'Browse RFQs', path: '/rfqs/browse' },
        { icon: Quote, label: 'Create Quotation', path: '/rfqs/create-quote' },
        { icon: Clock, label: 'Pending Quotes', path: '/rfqs/pending' },
        { icon: CheckCircle, label: 'Approved Quotes', path: '/rfqs/approved' }
      ]
    },
    {
      icon: ShoppingCart,
      label: 'Order Management',
      path: '/product-vendor-orders',
      submenu: [
        { icon: List, label: 'All Orders', path: '/orders/all' },
        { icon: Clock, label: 'Processing', path: '/orders/processing' },
        { icon: Truck, label: 'Shipping', path: '/orders/shipping' },
        { icon: CheckCircle, label: 'Delivered', path: '/orders/delivered' },
        { icon: Archive, label: 'Completed', path: '/orders/completed' }
      ]
    },
    {
      icon: Truck,
      label: 'Inventory & Logistics',
      path: '/inventory',
      submenu: [
        { icon: Package, label: 'Stock Levels', path: '/inventory/stock' },
        { icon: TrendingUp, label: 'Demand Forecast', path: '/inventory/forecast' },
        { icon: Truck, label: 'Shipping Management', path: '/inventory/shipping' },
        { icon: Building, label: 'Warehouses', path: '/inventory/warehouses' }
      ]
    },
    { 
      icon: MessageSquare, 
      label: 'Communication', 
      path: '/product-vendor-messages',
      submenu: [
        { icon: Mail, label: 'All Messages', path: '/messages' },
        { icon: Building, label: 'Customer Support', path: '/messages/support' },
        { icon: ShoppingCart, label: 'Order Inquiries', path: '/messages/orders' }
      ]
    },
    { 
      icon: BarChart3, 
      label: 'Sales Analytics', 
      path: '/analytics',
      submenu: [
        { icon: TrendingUp, label: 'Sales Performance', path: '/analytics/sales' },
        { icon: Package, label: 'Product Performance', path: '/analytics/products' },
        { icon: DollarSign, label: 'Revenue Reports', path: '/analytics/revenue' },
        { icon: Users, label: 'Customer Analytics', path: '/analytics/customers' }
      ]
    },
    { 
      icon: Settings, 
      label: 'Business Settings', 
      path: '/settings',
      submenu: [
        { icon: Building, label: 'Company Profile', path: '/product-vendor-profile' },
        { icon: Package, label: 'Product Categories', path: '/settings/categories' },
        { icon: Truck, label: 'Shipping Settings', path: '/settings/shipping' },
        { icon: CreditCard, label: 'Payment Gateway', path: '/settings/payments' },
        { icon: Award, label: 'Certifications', path: '/settings/certifications' }
      ]
    }
  ],

  'logistics-vendor': [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/logistics-vendor-dashboard' 
    },
    {
      icon: FileText,
      label: 'Transport Requests',
      path: '/logistics-vendor-requests',
      submenu: [
        { icon: Search, label: 'Browse Requests', path: '/requests/browse' },
        { icon: Quote, label: 'Submit Quote', path: '/requests/quote' },
        { icon: Clock, label: 'Pending Quotes', path: '/requests/pending' },
        { icon: CheckCircle, label: 'Accepted Jobs', path: '/requests/accepted' }
      ]
    },
    {
      icon: Activity,
      label: 'Active Deliveries',
      path: '/logistics-vendor-deliveries',
      submenu: [
        { icon: Truck, label: 'In Transit', path: '/deliveries/in-transit' },
        { icon: Calendar, label: 'Scheduled', path: '/deliveries/scheduled' },
        { icon: CheckCircle, label: 'Completed', path: '/deliveries/completed' },
        { icon: Globe, label: 'Live Tracking', path: '/deliveries/tracking' }
      ]
    },
    {
      icon: Truck,
      label: 'Fleet Management',
      path: '/logistics-vendor-fleet',
      submenu: [
        { icon: List, label: 'All Vehicles', path: '/fleet/vehicles' },
        { icon: Users, label: 'Drivers', path: '/fleet/drivers' },
        { icon: Settings, label: 'Maintenance', path: '/fleet/maintenance' },
        { icon: BarChart3, label: 'Utilization', path: '/fleet/utilization' },
        { icon: Plus, label: 'Add Vehicle', path: '/fleet/add-vehicle' }
      ]
    },
    {
      icon: Globe,
      label: 'Route Optimization',
      path: '/routes',
      submenu: [
        { icon: Globe, label: 'Route Planner', path: '/routes/planner' },
        { icon: TrendingUp, label: 'Optimization Reports', path: '/routes/optimization' },
        { icon: Activity, label: 'Real-time Updates', path: '/routes/real-time' },
        { icon: BarChart3, label: 'Performance Metrics', path: '/routes/metrics' }
      ]
    },
    { 
      icon: MessageSquare, 
      label: 'Communication', 
      path: '/logistics-vendor-messages',
      submenu: [
        { icon: Mail, label: 'All Messages', path: '/messages' },
        { icon: Building, label: 'Client Communications', path: '/messages/clients' },
        { icon: Users, label: 'Driver Updates', path: '/messages/drivers' },
        { icon: Bell, label: 'Alerts & Notifications', path: '/messages/alerts' }
      ]
    },
    { 
      icon: BarChart3, 
      label: 'Operations Analytics', 
      path: '/analytics',
      submenu: [
        { icon: TrendingUp, label: 'Performance Overview', path: '/analytics/performance' },
        { icon: DollarSign, label: 'Revenue Analytics', path: '/analytics/revenue' },
        { icon: Truck, label: 'Fleet Efficiency', path: '/analytics/fleet' },
        { icon: Globe, label: 'Route Analytics', path: '/analytics/routes' }
      ]
    },
    { 
      icon: Settings, 
      label: 'Company Settings', 
      path: '/settings',
      submenu: [
        { icon: Building, label: 'Company Profile', path: '/logistics-vendor-profile' },
        { icon: Truck, label: 'Fleet Settings', path: '/settings/fleet' },
        { icon: Globe, label: 'Service Areas', path: '/settings/service-areas' },
        { icon: Award, label: 'Licenses & Permits', path: '/settings/licenses' },
        { icon: CreditCard, label: 'Payment Settings', path: '/settings/payments' }
      ]
    }
  ]
};