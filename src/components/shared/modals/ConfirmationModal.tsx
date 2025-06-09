
import React from "react";
import { BaseModal } from "./BaseModal";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "success" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info",
  isLoading = false
}: ConfirmationModalProps) => {
  const getIcon = () => {
    switch (type) {
      case "danger":
        return <XCircle className="h-6 w-6 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return <Info className="h-6 w-6 text-blue-500" />;
    }
  };

  const getConfirmVariant = () => {
    switch (type) {
      case "danger":
        return "destructive" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          {getIcon()}
          <p className="text-gray-600">{message}</p>
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button
            variant={getConfirmVariant()}
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
