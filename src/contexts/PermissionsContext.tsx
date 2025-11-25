import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { 
  UserPermissions, 
  ModulePermission, 
  IndustryPermissionsConfig 
} from '@/types/permissions';
import { getDefaultPermissions, getHierarchicalConfig } from '@/config/permissionsConfig';
import { createPathToModuleMap, createPermissionsMap } from '@/utils/permissionUtils';

interface PermissionsContextType {
  permissions: UserPermissions;
  hierarchicalConfig: IndustryPermissionsConfig;
  setPermissions: (permissions: UserPermissions) => void;
  isLoading: boolean;
  getModulePermission: (moduleId: string) => ModulePermission | undefined;
  getHierarchicalModules: () => IndustryPermissionsConfig;
  getModuleIdByPath: (path: string) => string | null;
  getPermissionByPath: (path: string) => ModulePermission | undefined;
  permissionsMap: Map<string, ModulePermission>;
  pathToModuleMap: Map<string, string>;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

interface PermissionsProviderProps {
  children: ReactNode;
}

/**
 * PermissionsProvider - Global permissions management
 * 
 * Currently initializes with mock data (all permissions enabled)
 * Future: Will integrate with login API response
 */
export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({ children }) => {
  const [permissions, setPermissionsState] = useState<UserPermissions>(getDefaultPermissions());
  const [hierarchicalConfig, setHierarchicalConfig] = useState<IndustryPermissionsConfig>(getHierarchicalConfig());
  const [isLoading, setIsLoading] = useState(false);

  // Initialize permissions on mount
  useEffect(() => {
    const initializePermissions = () => {
      setIsLoading(true);
      try {
        // Try to load cached roleConfiguration from localStorage
        const cachedRoleConfig = localStorage.getItem('roleConfiguration');
        
        if (cachedRoleConfig) {
          try {
            const roleConfig = JSON.parse(cachedRoleConfig);
            // Transform and set permissions from cached data
            setPermissionsFromAPI(roleConfig);
          } catch (parseError) {
            console.error('Failed to parse cached permissions:', parseError);
            // Fall back to default permissions
            const defaultPermissions = getDefaultPermissions();
            setPermissionsState(defaultPermissions);
          }
        } else {
          // No cached data, use default mock permissions
          const defaultPermissions = getDefaultPermissions();
          setPermissionsState(defaultPermissions);
        }
      } catch (error) {
        console.error('Failed to initialize permissions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePermissions();
  }, []);

  // Listen for permissions update event from login
  useEffect(() => {
    const handlePermissionsUpdate = (event: CustomEvent) => {
      setPermissionsFromAPI(event.detail);
    };
    
    window.addEventListener('permissions:update', handlePermissionsUpdate as EventListener);
    return () => window.removeEventListener('permissions:update', handlePermissionsUpdate as EventListener);
  }, []);

  /**
   * Set permissions from API roleConfiguration
   * Transforms API response format to internal permission structures
   */
  const setPermissionsFromAPI = (roleConfig: any) => {
    try {
      // Import utilities dynamically to avoid circular dependency
      const { flattenAPIPermissions, transformAPIToHierarchical } = require('@/utils/permissionUtils');
      
      // Transform API permissions to flat array for runtime checks
      const flatPermissions = flattenAPIPermissions(roleConfig.permissions);
      setPermissionsState({ permissions: flatPermissions });
      
      // Transform to hierarchical config for UI display
      const hierarchicalConfig = transformAPIToHierarchical(roleConfig);
      setHierarchicalConfig(hierarchicalConfig);
      
      // Cache the transformed permissions
      try {
        localStorage.setItem('userPermissions', JSON.stringify({ permissions: flatPermissions }));
      } catch (error) {
        console.error('Failed to cache permissions:', error);
      }
    } catch (error) {
      console.error('Failed to transform API permissions:', error);
    }
  };

  /**
   * Update permissions - manual update method (backward compatibility)
   */
  const setPermissions = (newPermissions: UserPermissions) => {
    setPermissionsState(newPermissions);
    
    // Optional: Persist to localStorage for session management
    try {
      localStorage.setItem('userPermissions', JSON.stringify(newPermissions));
    } catch (error) {
      console.error('Failed to cache permissions:', error);
    }
  };

  /**
   * Get permissions for a specific module
   */
  const getModulePermission = (moduleId: string): ModulePermission | undefined => {
    return permissions.permissions.find((p) => p.module === moduleId);
  };

  /**
   * Get hierarchical modules configuration
   * Used for role management UI and sidebar rendering
   */
  const getHierarchicalModules = (): IndustryPermissionsConfig => {
    return hierarchicalConfig;
  };

  // Create path-to-module mapping for quick lookups
  const pathToModuleMap = useMemo(() => {
    return createPathToModuleMap(hierarchicalConfig);
  }, [hierarchicalConfig]);

  // Create permissions map for efficient lookups
  const permissionsMap = useMemo(() => {
    return createPermissionsMap(permissions.permissions);
  }, [permissions]);

  const getModuleIdByPath = (path: string): string | null => {
    return pathToModuleMap.get(path) || null;
  };

  const getPermissionByPath = (path: string): ModulePermission | undefined => {
    const moduleId = getModuleIdByPath(path);
    if (!moduleId) return undefined;
    return getModulePermission(moduleId);
  };

  const value: PermissionsContextType = {
    permissions,
    hierarchicalConfig,
    setPermissions,
    isLoading,
    getModulePermission,
    getHierarchicalModules,
    getModuleIdByPath,
    getPermissionByPath,
    permissionsMap,
    pathToModuleMap,
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};

/**
 * Hook to access permissions context
 */
export const usePermissionsContext = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissionsContext must be used within PermissionsProvider');
  }
  return context;
};
