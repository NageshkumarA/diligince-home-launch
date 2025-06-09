
import React from "react";
import { BaseModal } from "./BaseModal";
import { Button } from "@/components/ui/button";

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    icon?: React.ReactNode;
  }>;
  maxWidth?: string;
  className?: string;
}

export const DetailsModal = ({
  isOpen,
  onClose,
  title,
  children,
  actions = [],
  maxWidth = "max-w-4xl",
  className = ""
}: DetailsModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth={maxWidth}
      className={className}
    >
      <div className="space-y-6">
        {children}
        
        {actions.length > 0 && (
          <div className="flex gap-3 pt-4">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "default"}
                onClick={action.onClick}
                className="flex items-center gap-2"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </BaseModal>
  );
};
