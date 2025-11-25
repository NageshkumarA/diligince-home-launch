import { PermissionAction } from './roleManagement';

/**
 * Permission configuration for a specific module or sub-module
 */
export interface ModulePermission {
  module: string; // e.g., "industry-dashboard", "create-requirement"
  permissions: {
    read: boolean;
    write: boolean;
    edit: boolean;
    delete: boolean;
    download: boolean;
  };
}

/**
 * Complete user permissions configuration
 */
export interface UserPermissions {
  permissions: ModulePermission[];
}

/**
 * Module definition with metadata
 */
export interface ModuleDefinition {
  id: string; // e.g., "industry-dashboard"
  name: string; // Display name
  path: string; // Route path
  parentModule?: string; // Parent module ID if this is a sub-module
  availableActions: PermissionAction[]; // Available actions for this module
  description?: string;
}

/**
 * Permission check result
 */
export interface PermissionCheckResult {
  hasAccess: boolean;
  allowedActions: PermissionAction[];
}
