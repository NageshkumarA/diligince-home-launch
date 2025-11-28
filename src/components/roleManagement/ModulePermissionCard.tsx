import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PermissionToggleGroup } from "./PermissionToggleGroup";
import * as LucideIcons from "lucide-react";
import type { ModulePermissionV2, PermissionFlags } from "@/services/modules/roles/roles.types";

interface ModulePermissionCardProps {
  module: ModulePermissionV2;
  onChange: (module: ModulePermissionV2) => void;
}

export function ModulePermissionCard({ module, onChange }: ModulePermissionCardProps) {
  const IconComponent = (LucideIcons as any)[module.icon] || LucideIcons.Circle;

  const handleModulePermissionChange = (permissions: PermissionFlags) => {
    onChange({
      ...module,
      permissions,
    });
  };

  const handleSubmodulePermissionChange = (submoduleId: string, permissions: PermissionFlags) => {
    const updatedSubmodules = (module.submodules || []).map((sub) =>
      sub.id === submoduleId ? { ...sub, permissions } : sub
    );

    onChange({
      ...module,
      submodules: updatedSubmodules,
    });
  };

  const hasSubmodules = module.submodules && module.submodules.length > 0;

  return (
    <AccordionItem
      value={module.id}
      className="border border-border rounded-lg bg-card overflow-hidden"
    >
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50 transition-colors">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 rounded-md bg-primary/10">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">{module.name || "Unnamed Module"}</p>
            <p className="text-xs text-muted-foreground">{module.path || ""}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2">
        {/* Module-level permissions */}
        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Module Permissions</p>
          <PermissionToggleGroup
            permissions={module.permissions || {
              read: false,
              write: false,
              edit: false,
              delete: false,
              download: false,
            }}
            onChange={handleModulePermissionChange}
          />
        </div>

        {/* Submodules */}
        {hasSubmodules && (
          <div className="space-y-3 pl-4 border-l-2 border-border">
            {module.submodules.map((submodule) => {
              const SubIconComponent = (LucideIcons as any)[submodule.icon] || LucideIcons.Circle;
              
              return (
                <div key={submodule.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <SubIconComponent className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      {submodule.name || "Unnamed Submodule"}
                    </p>
                  </div>
                  <PermissionToggleGroup
                    permissions={submodule.permissions || {
                      read: false,
                      write: false,
                      edit: false,
                      delete: false,
                      download: false,
                    }}
                    onChange={(permissions) =>
                      handleSubmodulePermissionChange(submodule.id, permissions)
                    }
                    compact
                  />
                </div>
              );
            })}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
