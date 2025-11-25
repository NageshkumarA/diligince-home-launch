import { useMemo } from 'react';
import { PermissionAction } from '@/types/roleManagement';
import { usePermissionsContext } from '@/contexts/PermissionsContext';
import { getModuleDefinition } from '@/config/permissionsConfig';

/**
 * Hook for checking user permissions
 * 
 * Usage examples:
 * 
 * // Check if user can perform specific action
 * const canEdit = hasPermission('industry-requirements', 'edit');
 * 
 * // Check if user can access a module (read permission)
 * const canAccessDashboard = canAccessModule('industry-dashboard');
 * 
 * // Get all permissions for a module
 * const reqPerms = getModulePermissions('industry-requirements');
 * 
 * // Check if nav item should be visible
 * const showInNav = canShowNavItem('industry-requirements');
 */
export const usePermissions = () => {
  const { permissions, getModulePermission, isLoading } = usePermissionsContext();

  /**
   * Check if user has specific permission for a module
   */
  const hasPermission = (moduleId: string, action: PermissionAction): boolean => {
    const modulePermission = getModulePermission(moduleId);
    
    if (!modulePermission) {
      console.warn(`Permission not found for module: ${moduleId}`);
      return false;
    }

    return modulePermission.permissions[action] || false;
  };

  /**
   * Check if user can access a module (has read permission)
   */
  const canAccessModule = (moduleId: string): boolean => {
    return hasPermission(moduleId, 'read');
  };

  /**
   * Get all permissions for a specific module
   */
  const getModulePermissions = (moduleId: string) => {
    const modulePermission = getModulePermission(moduleId);
    return modulePermission?.permissions || null;
  };

  /**
   * Check if navigation item should be visible
   * A nav item is visible if user has read permission
   */
  const canShowNavItem = (moduleId: string): boolean => {
    return canAccessModule(moduleId);
  };

  /**
   * Get list of allowed actions for a module
   */
  const getAllowedActions = (moduleId: string): PermissionAction[] => {
    const modulePermission = getModulePermission(moduleId);
    
    if (!modulePermission) {
      return [];
    }

    const actions: PermissionAction[] = [];
    const perms = modulePermission.permissions;

    if (perms.read) actions.push('read');
    if (perms.write) actions.push('write');
    if (perms.edit) actions.push('edit');
    if (perms.delete) actions.push('delete');
    if (perms.download) actions.push('download');

    return actions;
  };

  /**
   * Check multiple permissions at once
   */
  const hasAllPermissions = (moduleId: string, actions: PermissionAction[]): boolean => {
    return actions.every((action) => hasPermission(moduleId, action));
  };

  /**
   * Check if user has any of the specified permissions
   */
  const hasAnyPermission = (moduleId: string, actions: PermissionAction[]): boolean => {
    return actions.some((action) => hasPermission(moduleId, action));
  };

  /**
   * Get module definition with permissions applied
   */
  const getModuleWithPermissions = (moduleId: string) => {
    const definition = getModuleDefinition(moduleId);
    const perms = getModulePermissions(moduleId);
    const allowedActions = getAllowedActions(moduleId);

    return {
      definition,
      permissions: perms,
      allowedActions,
      canAccess: canAccessModule(moduleId),
    };
  };

  return useMemo(
    () => ({
      permissions,
      isLoading,
      hasPermission,
      canAccessModule,
      getModulePermissions,
      canShowNavItem,
      getAllowedActions,
      hasAllPermissions,
      hasAnyPermission,
      getModuleWithPermissions,
    }),
    [permissions, isLoading]
  );
};
