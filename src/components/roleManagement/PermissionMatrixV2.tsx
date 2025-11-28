import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { ModulePermissionCard } from "./ModulePermissionCard";
import type { ModulePermissionV2 } from "@/services/modules/roles/roles.types";

interface PermissionMatrixV2Props {
  permissions: ModulePermissionV2[];
  onChange: (permissions: ModulePermissionV2[]) => void;
}

export function PermissionMatrixV2({ permissions, onChange }: PermissionMatrixV2Props) {
  const handleModuleChange = (moduleId: string, updatedModule: ModulePermissionV2) => {
    const updated = permissions.map((module) =>
      module.id === moduleId ? updatedModule : module
    );
    onChange(updated);
  };

  if (!permissions || permissions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No permissions available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Accordion type="multiple" className="space-y-2">
        {permissions.map((module) => (
          <ModulePermissionCard
            key={module.id}
            module={module}
            onChange={(updatedModule) => handleModuleChange(module.id, updatedModule)}
          />
        ))}
      </Accordion>
    </div>
  );
}
