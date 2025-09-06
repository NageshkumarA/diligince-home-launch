export type PermissionAction = 'read' | 'write' | 'delete' | 'edit' | 'download';

export type UserType = 'IndustryAdmin' | 'ServiceVendor' | 'ProductVendor' | 'LogisticsVendor';

export interface Permission {
  moduleId: string;
  moduleName: string;
  actions: PermissionAction[];
  subModuleId?: string; // For sub-module level permissions
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userType: UserType;
  permissions: Permission[];
  isSystemRole: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  category: string;
  availableActions: PermissionAction[];
  userTypes: UserType[];
  subModules?: SubModule[];
}

export interface SubModule {
  id: string;
  name: string;
  description: string;
  availableActions: PermissionAction[];
}

export interface UserRole {
  userId: string;
  userName: string;
  userEmail: string;
  roleId: string;
  roleName: string;
  assignedBy: string;
  assignedAt: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  userType: UserType;
  permissions: Permission[];
  isDefault: boolean;
}

export interface RoleFilters {
  search: string;
  userType: UserType | 'all';
  status: 'active' | 'inactive' | 'all';
}

export interface CreateRoleFormData {
  name: string;
  description: string;
  userType: UserType;
  permissions: Permission[];
  templateId?: string;
}