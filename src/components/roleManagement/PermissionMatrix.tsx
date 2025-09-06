import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Module, Permission, PermissionAction } from "@/types/roleManagement";

interface PermissionMatrixProps {
  modules: Module[];
  selectedPermissions: Permission[];
  onPermissionChange: (permissions: Permission[]) => void;
}

export const PermissionMatrix = ({ 
  modules, 
  selectedPermissions, 
  onPermissionChange 
}: PermissionMatrixProps) => {

  const getModulePermission = (moduleId: string): Permission | undefined => {
    return selectedPermissions.find(p => p.moduleId === moduleId);
  };

  const hasAction = (moduleId: string, action: PermissionAction, subModuleId?: string): boolean => {
    if (subModuleId) {
      const permission = selectedPermissions.find(p => p.moduleId === moduleId && p.subModuleId === subModuleId);
      return permission ? permission.actions.includes(action) : false;
    }
    const permission = getModulePermission(moduleId);
    return permission ? permission.actions.includes(action) : false;
  };

  const toggleAction = (moduleId: string, moduleName: string, action: PermissionAction, subModuleId?: string, subModuleName?: string) => {
    if (subModuleId && subModuleName) {
      // Handle sub-module permission
      const existingPermission = selectedPermissions.find(p => p.moduleId === moduleId && p.subModuleId === subModuleId);
      
      if (!existingPermission) {
        // Create new sub-module permission
        const newPermission: Permission = {
          moduleId,
          moduleName: `${moduleName} > ${subModuleName}`,
          actions: [action],
          subModuleId
        };
        onPermissionChange([...selectedPermissions, newPermission]);
      } else {
        // Update existing sub-module permission
        const updatedPermissions = selectedPermissions.map(p => {
          if (p.moduleId === moduleId && p.subModuleId === subModuleId) {
            const actions = p.actions.includes(action)
              ? p.actions.filter(a => a !== action)
              : [...p.actions, action];
            
            return { ...p, actions };
          }
          return p;
        }).filter(p => p.actions.length > 0);
        
        onPermissionChange(updatedPermissions);
      }
    } else {
      // Handle module-level permission
      const existingPermission = getModulePermission(moduleId);
      
      if (!existingPermission) {
        // Create new permission with this action
        const newPermission: Permission = {
          moduleId,
          moduleName,
          actions: [action]
        };
        onPermissionChange([...selectedPermissions, newPermission]);
      } else {
        // Update existing permission
        const updatedPermissions = selectedPermissions.map(p => {
          if (p.moduleId === moduleId && !p.subModuleId) {
            const actions = p.actions.includes(action)
              ? p.actions.filter(a => a !== action)
              : [...p.actions, action];
            
            return { ...p, actions };
          }
          return p;
        }).filter(p => p.actions.length > 0);
        
        onPermissionChange(updatedPermissions);
      }
    }
  };

  const toggleAllActions = (moduleId: string, moduleName: string, allActions: PermissionAction[]) => {
    const existingPermission = getModulePermission(moduleId);
    const hasAllActions = existingPermission && 
      allActions.every(action => existingPermission.actions.includes(action));

    if (hasAllActions) {
      // Remove all actions for this module
      const updatedPermissions = selectedPermissions.filter(p => p.moduleId !== moduleId);
      onPermissionChange(updatedPermissions);
    } else {
      // Add all actions for this module
      const updatedPermissions = selectedPermissions.filter(p => p.moduleId !== moduleId);
      const newPermission: Permission = {
        moduleId,
        moduleName,
        actions: [...allActions]
      };
      onPermissionChange([...updatedPermissions, newPermission]);
    }
  };

  const allActions: PermissionAction[] = ['read', 'write', 'edit', 'delete', 'download'];

  const getActionColor = (action: PermissionAction): string => {
    const colors = {
      read: 'bg-blue-100 text-blue-800 border-blue-200',
      write: 'bg-green-100 text-green-800 border-green-200',
      edit: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      delete: 'bg-red-100 text-red-800 border-red-200',
      download: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[action];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Module Permissions</h3>
        <div className="flex gap-2 text-xs">
          {allActions.map(action => (
            <Badge key={action} variant="outline" className={getActionColor(action)}>
              {action}
            </Badge>
          ))}
        </div>
      </div>

      {/* Permission Grid */}
      <div className="space-y-4">
        {modules.map(module => {
          const modulePermission = getModulePermission(module.id);
          const hasAllModuleActions = modulePermission && 
            module.availableActions.every(action => modulePermission.actions.includes(action));
          
          return (
            <div key={module.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Checkbox
                      checked={hasAllModuleActions || false}
                      onCheckedChange={() => toggleAllActions(module.id, module.name, module.availableActions)}
                    />
                    <h4 className="font-medium">{module.name}</h4>
                    <Badge variant="secondary">{module.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{module.description}</p>
                </div>
              </div>

              {/* Actions Grid - Only show if no sub-modules */}
              {(!module.subModules || module.subModules.length === 0) && (
                <div className="ml-6 grid grid-cols-5 gap-3">
                  {module.availableActions.map(action => (
                    <label
                      key={action}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={hasAction(module.id, action)}
                        onCheckedChange={() => toggleAction(module.id, module.name, action)}
                      />
                      <span className={`text-sm px-2 py-1 rounded-md border ${getActionColor(action)}`}>
                        {action}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* Sub-modules */}
              {module.subModules && module.subModules.length > 0 && (
                <div className="ml-6 mt-4 space-y-3 border-l-2 border-muted pl-4">
                  {module.subModules.map(subModule => (
                    <div key={subModule.id} className="border rounded-md p-3 bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="font-medium text-sm">{subModule.name}</h5>
                        <Badge variant="outline" className="text-xs">Sub-module</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{subModule.description}</p>
                      
                      {/* Sub-module Actions Grid */}
                      <div className="grid grid-cols-5 gap-2">
                        {subModule.availableActions.map(action => (
                          <label
                            key={action}
                            className="flex items-center space-x-1 cursor-pointer"
                          >
                            <Checkbox
                              checked={hasAction(module.id, action, subModule.id)}
                              onCheckedChange={() => toggleAction(module.id, module.name, action, subModule.id, subModule.name)}
                            />
                            <span className={`text-xs px-1 py-0.5 rounded border ${getActionColor(action)}`}>
                              {action}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {selectedPermissions.length > 0 && (
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Selected Permissions Summary</h4>
          <div className="space-y-1">
            {selectedPermissions.map(permission => (
              <div key={permission.moduleId} className="flex items-center gap-2 text-sm">
                <span className="font-medium">{permission.moduleName}:</span>
                <div className="flex gap-1">
                  {permission.actions.map(action => (
                    <Badge
                      key={action}
                      variant="outline"
                      className={`text-xs ${getActionColor(action)}`}
                    >
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};