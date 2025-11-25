import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserPermissions, 
  ModulePermission, 
  IndustryPermissionsConfig 
} from '@/types/permissions';
import { getDefaultPermissions, getHierarchicalConfig } from '@/config/permissionsConfig';

interface PermissionsContextType {
  permissions: UserPermissions;
  hierarchicalConfig: IndustryPermissionsConfig;
  setPermissions: (permissions: UserPermissions) => void;
  isLoading: boolean;
  getModulePermission: (moduleId: string) => ModulePermission | undefined;
  getHierarchicalModules: () => IndustryPermissionsConfig;
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
    // Currently using mock data
    // TODO: Replace with actual API call when login endpoint is updated
    const initializePermissions = () => {
      setIsLoading(true);
      try {
        const defaultPermissions = getDefaultPermissions();
        setPermissionsState(defaultPermissions);
      } catch (error) {
        console.error('Failed to initialize permissions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePermissions();
  }, []);

  /**
   * Update permissions - will be called after login with API response
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

  const value: PermissionsContextType = {
    permissions,
    hierarchicalConfig,
    setPermissions,
    isLoading,
    getModulePermission,
    getHierarchicalModules,
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
