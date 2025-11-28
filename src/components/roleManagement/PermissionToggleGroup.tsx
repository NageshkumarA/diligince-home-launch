import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit3, Trash2, Download, FilePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PermissionFlags } from "@/services/modules/roles/roles.types";

interface PermissionToggleGroupProps {
  permissions: PermissionFlags;
  onChange: (permissions: PermissionFlags) => void;
  compact?: boolean;
}

const permissionConfig = [
  { key: "read" as const, label: "Read", icon: Eye, color: "blue" },
  { key: "write" as const, label: "Write", icon: FilePlus, color: "green" },
  { key: "edit" as const, label: "Edit", icon: Edit3, color: "amber" },
  { key: "delete" as const, label: "Delete", icon: Trash2, color: "red" },
  { key: "download" as const, label: "Download", icon: Download, color: "purple" },
];

export function PermissionToggleGroup({
  permissions,
  onChange,
  compact = false,
}: PermissionToggleGroupProps) {
  const handleToggle = (key: keyof PermissionFlags) => {
    onChange({
      ...permissions,
      [key]: !permissions[key],
    });
  };

  return (
    <div className={cn("flex flex-wrap gap-2", compact && "gap-1.5")}>
      {permissionConfig.map(({ key, label, icon: Icon, color }) => {
        const isActive = permissions[key] === true;

        return (
          <Button
            key={key}
            type="button"
            variant={isActive ? "default" : "outline"}
            size={compact ? "sm" : "default"}
            onClick={() => handleToggle(key)}
            className={cn(
              "transition-all",
              isActive && color === "blue" && "bg-blue-600 hover:bg-blue-700 text-white",
              isActive && color === "green" && "bg-green-600 hover:bg-green-700 text-white",
              isActive && color === "amber" && "bg-amber-600 hover:bg-amber-700 text-white",
              isActive && color === "red" && "bg-red-600 hover:bg-red-700 text-white",
              isActive && color === "purple" && "bg-purple-600 hover:bg-purple-700 text-white",
              !isActive && "hover:border-primary"
            )}
          >
            <Icon className={cn("h-4 w-4", !compact && "mr-2")} />
            {!compact && label}
          </Button>
        );
      })}
    </div>
  );
}
