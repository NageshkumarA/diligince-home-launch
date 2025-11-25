import { INDUSTRY_MODULES } from '@/config/permissionsConfig';
import { ModulePermission } from '@/types/permissions';
import { PermissionAction } from '@/types/roleManagement';

/**
 * Convert a route path to module ID
 * 
 * Examples:
 * /dashboard/requirements -> industry-requirements
 * /dashboard/create-requirement -> create-requirement
 * /dashboard/requirements/123 -> view-requirement
 */
export const getModuleIdFromPath = (path: string): string | null => {
  // Remove leading/trailing slashes
  const cleanPath = path.replace(/^\/|\/$/g, '');
  
  // Try exact match first
  const exactMatch = INDUSTRY_MODULES.find((m) => {
    const modulePath = m.path.replace(/^\/|\/$/g, '');
    return modulePath === cleanPath;
  });
  
  if (exactMatch) {
    return exactMatch.id;
  }
  
  // Try pattern match for dynamic routes (e.g., /requirements/:id)
  const pathSegments = cleanPath.split('/');
  const patternMatch = INDUSTRY_MODULES.find((m) => {
    const modulePath = m.path.replace(/^\/|\/$/g, '');
    const moduleSegments = modulePath.split('/');
    
    if (moduleSegments.length !== pathSegments.length) {
      return false;
    }
    
    return moduleSegments.every((segment, index) => {
      return segment === pathSegments[index] || segment.startsWith(':');
    });
  });
  
  if (patternMatch) {
    return patternMatch.id;
  }
  
  console.warn(`No module found for path: ${path}`);
  return null;
};

/**
 * Filter navigation items based on user permissions
 * Only show items where user has read permission
 */
export const filterNavItemsByPermissions = <T extends { path: string }>(
  items: T[],
  permissionsMap: Map<string, ModulePermission>
): T[] => {
  return items.filter((item) => {
    const moduleId = getModuleIdFromPath(item.path);
    
    if (!moduleId) {
      // If no module found, hide by default for security
      return false;
    }
    
    const permission = permissionsMap.get(moduleId);
    return permission?.permissions.read || false;
  });
};

/**
 * Get allowed actions for a module from permissions
 */
export const getAllowedActions = (
  moduleId: string,
  permissionsMap: Map<string, ModulePermission>
): PermissionAction[] => {
  const permission = permissionsMap.get(moduleId);
  
  if (!permission) {
    return [];
  }
  
  const actions: PermissionAction[] = [];
  const perms = permission.permissions;
  
  if (perms.read) actions.push('read');
  if (perms.write) actions.push('write');
  if (perms.edit) actions.push('edit');
  if (perms.delete) actions.push('delete');
  if (perms.download) actions.push('download');
  
  return actions;
};

/**
 * Check if a specific action is allowed for a module
 */
export const isActionAllowed = (
  moduleId: string,
  action: PermissionAction,
  permissionsMap: Map<string, ModulePermission>
): boolean => {
  const permission = permissionsMap.get(moduleId);
  return permission?.permissions[action] || false;
};

/**
 * Create a permissions map for quick lookups
 */
export const createPermissionsMap = (
  permissions: ModulePermission[]
): Map<string, ModulePermission> => {
  const map = new Map<string, ModulePermission>();
  
  permissions.forEach((permission) => {
    map.set(permission.module, permission);
  });
  
  return map;
};

/**
 * Merge default permissions with user-specific overrides
 */
export const mergePermissions = (
  defaultPerms: ModulePermission[],
  userPerms: ModulePermission[]
): ModulePermission[] => {
  const merged = new Map<string, ModulePermission>();
  
  // Start with defaults
  defaultPerms.forEach((perm) => {
    merged.set(perm.module, { ...perm });
  });
  
  // Override with user-specific permissions
  userPerms.forEach((perm) => {
    merged.set(perm.module, { ...perm });
  });
  
  return Array.from(merged.values());
};

/**
 * Validate permissions structure
 */
export const validatePermissions = (permissions: ModulePermission[]): boolean => {
  return permissions.every((perm) => {
    return (
      typeof perm.module === 'string' &&
      perm.module.length > 0 &&
      typeof perm.permissions === 'object' &&
      typeof perm.permissions.read === 'boolean' &&
      typeof perm.permissions.write === 'boolean' &&
      typeof perm.permissions.edit === 'boolean' &&
      typeof perm.permissions.delete === 'boolean' &&
      typeof perm.permissions.download === 'boolean'
    );
  });
};
