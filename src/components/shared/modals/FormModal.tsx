
import React from "react";
import { BaseModal } from "./BaseModal";
import { Button } from "@/components/ui/button";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitText?: string;
  cancelText?: string;
  submitVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  isSubmitting?: boolean;
  maxWidth?: string;
  className?: string;
}

export const FormModal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  submitVariant = "default",
  isSubmitting = false,
  maxWidth = "max-w-2xl",
  className = ""
}: FormModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth={maxWidth}
      className={className}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        
        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            variant={submitVariant}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Submitting..." : submitText}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            {cancelText}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};
