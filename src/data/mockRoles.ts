import { Role, UserRole, Module, RoleTemplate } from "@/types/roleManagement";

export const mockModules: Module[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Main dashboard and analytics',
    category: 'Core',
    availableActions: ['read'],
    userTypes: ['IndustryAdmin', 'ServiceVendor', 'ProductVendor', 'LogisticsVendor']
  },
  {
    id: 'requirements',
    name: 'Requirements',
    description: 'Manage project requirements and RFQs',
    category: 'Project Management',
    availableActions: ['read', 'write', 'edit', 'delete', 'download'],
    userTypes: ['IndustryAdmin'],
    subModules: [
      {
        id: 'requirements-create',
        name: 'Create Requirements',
        description: 'Create new project requirements',
        availableActions: ['write']
      },
      {
        id: 'requirements-approve',
        name: 'Approve Requirements',
        description: 'Approve submitted requirements',
        availableActions: ['read', 'edit']
      }
    ]
  },
  {
    id: 'quotes',
    name: 'Quotes & RFQs',
    description: 'Manage quotations and RFQ responses',
    category: 'Procurement',
    availableActions: ['read', 'write', 'edit', 'delete', 'download'],
    userTypes: ['IndustryAdmin', 'ServiceVendor', 'ProductVendor', 'LogisticsVendor']
  },
  {
    id: 'purchase-orders',
    name: 'Purchase Orders',
    description: 'Manage purchase orders and procurement',
    category: 'Procurement',
    availableActions: ['read', 'write', 'edit', 'delete', 'download'],
    userTypes: ['IndustryAdmin']
  },
  {
    id: 'approvals',
    name: 'Approvals',
    description: 'Approval workflows and matrix',
    category: 'Workflow',
    availableActions: ['read', 'write', 'edit'],
    userTypes: ['IndustryAdmin']
  },
  {
    id: 'team',
    name: 'Team Management',
    description: 'Manage team members and roles',
    category: 'Administration',
    availableActions: ['read', 'write', 'edit', 'delete'],
    userTypes: ['IndustryAdmin']
  },
  {
    id: 'stakeholders',
    name: 'Stakeholders',
    description: 'Manage vendors and professionals',
    category: 'Administration',
    availableActions: ['read', 'write', 'edit'],
    userTypes: ['IndustryAdmin']
  },
  {
    id: 'messages',
    name: 'Messages',
    description: 'Internal messaging and communication',
    category: 'Communication',
    availableActions: ['read', 'write', 'delete'],
    userTypes: ['IndustryAdmin', 'ServiceVendor', 'ProductVendor', 'LogisticsVendor']
  },
  {
    id: 'documents',
    name: 'Documents',
    description: 'Document management and storage',
    category: 'Administration',
    availableActions: ['read', 'write', 'edit', 'delete', 'download'],
    userTypes: ['IndustryAdmin']
  },
  {
    id: 'reports',
    name: 'Reports & Analytics',
    description: 'Generate reports and view analytics',
    category: 'Analytics',
    availableActions: ['read', 'download'],
    userTypes: ['IndustryAdmin']
  },
  {
    id: 'services',
    name: 'Service Management',
    description: 'Manage service offerings and projects',
    category: 'Service Operations',
    availableActions: ['read', 'write', 'edit', 'delete'],
    userTypes: ['ServiceVendor']
  },
  {
    id: 'products',
    name: 'Product Catalog',
    description: 'Manage product inventory and catalog',
    category: 'Product Operations',
    availableActions: ['read', 'write', 'edit', 'delete', 'download'],
    userTypes: ['ProductVendor']
  },
  {
    id: 'orders',
    name: 'Order Management',
    description: 'Manage customer orders and fulfillment',
    category: 'Product Operations',
    availableActions: ['read', 'write', 'edit'],
    userTypes: ['ProductVendor']
  },
  {
    id: 'logistics',
    name: 'Logistics & Fleet',
    description: 'Manage fleet and delivery operations',
    category: 'Logistics Operations',
    availableActions: ['read', 'write', 'edit', 'delete'],
    userTypes: ['LogisticsVendor']
  },
  {
    id: 'deliveries',
    name: 'Delivery Management',
    description: 'Track and manage deliveries',
    category: 'Logistics Operations',
    availableActions: ['read', 'write', 'edit'],
    userTypes: ['LogisticsVendor']
  }
];

export const mockRoleTemplates: RoleTemplate[] = [
  {
    id: 'industry-admin-template',
    name: 'Industry Administrator',
    description: 'Full access to all industry modules',
    userType: 'IndustryAdmin',
    isDefault: true,
    permissions: [
      { moduleId: 'dashboard', moduleName: 'Dashboard', actions: ['read'] },
      { moduleId: 'requirements', moduleName: 'Requirements', actions: ['read', 'write', 'edit', 'delete', 'download'] },
      { moduleId: 'quotes', moduleName: 'Quotes & RFQs', actions: ['read', 'write', 'edit', 'delete', 'download'] },
      { moduleId: 'purchase-orders', moduleName: 'Purchase Orders', actions: ['read', 'write', 'edit', 'delete', 'download'] },
      { moduleId: 'approvals', moduleName: 'Approvals', actions: ['read', 'write', 'edit'] },
      { moduleId: 'team', moduleName: 'Team Management', actions: ['read', 'write', 'edit', 'delete'] },
      { moduleId: 'stakeholders', moduleName: 'Stakeholders', actions: ['read', 'write', 'edit'] },
      { moduleId: 'messages', moduleName: 'Messages', actions: ['read', 'write', 'delete'] },
      { moduleId: 'documents', moduleName: 'Documents', actions: ['read', 'write', 'edit', 'delete', 'download'] },
      { moduleId: 'reports', moduleName: 'Reports & Analytics', actions: ['read', 'download'] }
    ]
  },
  {
    id: 'procurement-manager-template',
    name: 'Procurement Manager',
    description: 'Manage requirements and purchase orders',
    userType: 'IndustryAdmin',
    isDefault: false,
    permissions: [
      { moduleId: 'dashboard', moduleName: 'Dashboard', actions: ['read'] },
      { moduleId: 'requirements', moduleName: 'Requirements', actions: ['read', 'write', 'edit'] },
      { moduleId: 'quotes', moduleName: 'Quotes & RFQs', actions: ['read', 'write', 'edit'] },
      { moduleId: 'purchase-orders', moduleName: 'Purchase Orders', actions: ['read', 'write', 'edit'] },
      { moduleId: 'messages', moduleName: 'Messages', actions: ['read', 'write'] }
    ]
  },
  {
    id: 'service-vendor-admin-template',
    name: 'Service Vendor Administrator',
    description: 'Full access to service vendor modules',
    userType: 'ServiceVendor',
    isDefault: true,
    permissions: [
      { moduleId: 'dashboard', moduleName: 'Dashboard', actions: ['read'] },
      { moduleId: 'quotes', moduleName: 'Quotes & RFQs', actions: ['read', 'write', 'edit'] },
      { moduleId: 'services', moduleName: 'Service Management', actions: ['read', 'write', 'edit', 'delete'] },
      { moduleId: 'messages', moduleName: 'Messages', actions: ['read', 'write', 'delete'] }
    ]
  },
  {
    id: 'product-vendor-admin-template',
    name: 'Product Vendor Administrator',
    description: 'Full access to product vendor modules',
    userType: 'ProductVendor',
    isDefault: true,
    permissions: [
      { moduleId: 'dashboard', moduleName: 'Dashboard', actions: ['read'] },
      { moduleId: 'quotes', moduleName: 'Quotes & RFQs', actions: ['read', 'write', 'edit'] },
      { moduleId: 'products', moduleName: 'Product Catalog', actions: ['read', 'write', 'edit', 'delete', 'download'] },
      { moduleId: 'orders', moduleName: 'Order Management', actions: ['read', 'write', 'edit'] },
      { moduleId: 'messages', moduleName: 'Messages', actions: ['read', 'write', 'delete'] }
    ]
  },
  {
    id: 'logistics-vendor-admin-template',
    name: 'Logistics Vendor Administrator',
    description: 'Full access to logistics vendor modules',
    userType: 'LogisticsVendor',
    isDefault: true,
    permissions: [
      { moduleId: 'dashboard', moduleName: 'Dashboard', actions: ['read'] },
      { moduleId: 'quotes', moduleName: 'Quotes & RFQs', actions: ['read', 'write', 'edit'] },
      { moduleId: 'logistics', moduleName: 'Logistics & Fleet', actions: ['read', 'write', 'edit', 'delete'] },
      { moduleId: 'deliveries', moduleName: 'Delivery Management', actions: ['read', 'write', 'edit'] },
      { moduleId: 'messages', moduleName: 'Messages', actions: ['read', 'write', 'delete'] }
    ]
  }
];

export const mockRoles: Role[] = [
  {
    id: 'role-1',
    name: 'System Administrator',
    description: 'Full system access and administration',
    userType: 'IndustryAdmin',
    isSystemRole: true,
    createdBy: 'system',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    permissions: mockRoleTemplates[0].permissions
  },
  {
    id: 'role-2',
    name: 'Procurement Manager',
    description: 'Manages procurement processes and vendor relationships',
    userType: 'IndustryAdmin',
    isSystemRole: false,
    createdBy: 'admin-1',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    permissions: mockRoleTemplates[1].permissions
  },
  {
    id: 'role-3',
    name: 'Service Provider',
    description: 'Standard service vendor access',
    userType: 'ServiceVendor',
    isSystemRole: true,
    createdBy: 'system',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    permissions: mockRoleTemplates[2].permissions
  },
  {
    id: 'role-4',
    name: 'Product Supplier',
    description: 'Standard product vendor access',
    userType: 'ProductVendor',
    isSystemRole: true,
    createdBy: 'system',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    permissions: mockRoleTemplates[3].permissions
  },
  {
    id: 'role-5',
    name: 'Logistics Partner',
    description: 'Standard logistics vendor access',
    userType: 'LogisticsVendor',
    isSystemRole: true,
    createdBy: 'system',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    permissions: mockRoleTemplates[4].permissions
  }
];

export const mockUserRoles: UserRole[] = [
  {
    userId: 'user-1',
    userName: 'John Smith',
    userEmail: 'john.smith@company.com',
    roleId: 'role-1',
    roleName: 'System Administrator',
    assignedBy: 'system',
    assignedAt: '2024-01-01T00:00:00Z',
    status: 'active'
  },
  {
    userId: 'user-2',
    userName: 'Sarah Johnson',
    userEmail: 'sarah.johnson@company.com',
    roleId: 'role-2',
    roleName: 'Procurement Manager',
    assignedBy: 'user-1',
    assignedAt: '2024-01-15T00:00:00Z',
    status: 'active'
  },
  {
    userId: 'user-3',
    userName: 'Mike Wilson',
    userEmail: 'mike.wilson@servicevendor.com',
    roleId: 'role-3',
    roleName: 'Service Provider',
    assignedBy: 'system',
    assignedAt: '2024-02-01T00:00:00Z',
    status: 'active'
  },
  {
    userId: 'user-4',
    userName: 'Lisa Chen',
    userEmail: 'lisa.chen@productvendor.com',
    roleId: 'role-4',
    roleName: 'Product Supplier',
    assignedBy: 'system',
    assignedAt: '2024-02-15T00:00:00Z',
    status: 'active'
  },
  {
    userId: 'user-5',
    userName: 'David Brown',
    userEmail: 'david.brown@logistics.com',
    roleId: 'role-5',
    roleName: 'Logistics Partner',
    assignedBy: 'system',
    assignedAt: '2024-03-01T00:00:00Z',
    status: 'active'
  }
];