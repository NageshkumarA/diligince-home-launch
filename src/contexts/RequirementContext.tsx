
import React, { createContext, useContext, useState } from "react";

export type RequirementCategory = "expert" | "product" | "service" | "logistics";

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  documentType: "specification" | "drawing" | "reference" | "other";
}

export interface RequirementFormData {
  // Basic Info (Step 1)
  title: string;
  category: RequirementCategory | null;
  
  // Details (Step 2)
  // Expert
  specialization?: string;
  description?: string;
  certifications?: string[];
  budget?: number;
  startDate?: Date | null;
  endDate?: Date | null;
  duration?: number;
  
  // Product
  productSpecifications?: string;
  quantity?: number;
  productDeliveryDate?: Date | null;
  qualityRequirements?: string;
  
  // Service
  serviceDescription?: string;
  scopeOfWork?: string;
  serviceStartDate?: Date | null;
  serviceEndDate?: Date | null;
  serviceBudget?: number;
  location?: string;
  
  // Logistics
  equipmentType?: string;
  weight?: number;
  dimensions?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  pickupDate?: Date | null;
  deliveryDate?: Date | null;
  specialHandling?: string;
  
  // Documents (Step 3)
  documents: DocumentFile[];
  
  // Publish (Step 5)
  visibility: "all" | "selected";
  selectedVendors?: string[];
  submissionDeadline?: Date | null;
  notifyByEmail: boolean;
  notifyByApp: boolean;
  termsAccepted: boolean;
}

const initialFormData: RequirementFormData = {
  title: "",
  category: null,
  documents: [],
  visibility: "all",
  notifyByEmail: true,
  notifyByApp: true,
  termsAccepted: false,
};

interface RequirementContextType {
  formData: RequirementFormData;
  updateFormData: (data: Partial<RequirementFormData>) => void;
  resetFormData: () => void;
  validateStep: (step: number) => boolean;
  stepErrors: Record<string, string>;
}

const RequirementContext = createContext<RequirementContextType | undefined>(undefined);

export const RequirementProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<RequirementFormData>(initialFormData);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const updateFormData = (data: Partial<RequirementFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.title.trim()) {
        errors.title = "Requirement title is required";
        isValid = false;
      }

      if (!formData.category) {
        errors.category = "Please select a category";
        isValid = false;
      }
    } else if (step === 2) {
      if (formData.category === "expert") {
        if (!formData.specialization) {
          errors.specialization = "Specialization is required";
          isValid = false;
        }
        if (!formData.description) {
          errors.description = "Description is required";
          isValid = false;
        }
      } else if (formData.category === "product") {
        if (!formData.productSpecifications) {
          errors.productSpecifications = "Product specifications are required";
          isValid = false;
        }
        if (!formData.quantity || formData.quantity <= 0) {
          errors.quantity = "Valid quantity is required";
          isValid = false;
        }
      } else if (formData.category === "service") {
        if (!formData.serviceDescription) {
          errors.serviceDescription = "Service description is required";
          isValid = false;
        }
        if (!formData.scopeOfWork) {
          errors.scopeOfWork = "Scope of work is required";
          isValid = false;
        }
      } else if (formData.category === "logistics") {
        if (!formData.equipmentType) {
          errors.equipmentType = "Equipment type is required";
          isValid = false;
        }
        if (!formData.pickupLocation) {
          errors.pickupLocation = "Pickup location is required";
          isValid = false;
        }
        if (!formData.deliveryLocation) {
          errors.deliveryLocation = "Delivery location is required";
          isValid = false;
        }
      }
    } else if (step === 5) {
      if (!formData.submissionDeadline) {
        errors.submissionDeadline = "Submission deadline is required";
        isValid = false;
      }
      if (!formData.termsAccepted) {
        errors.termsAccepted = "You must accept the terms and conditions";
        isValid = false;
      }
    }

    setStepErrors(errors);
    return isValid;
  };

  return (
    <RequirementContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        validateStep,
        stepErrors,
      }}
    >
      {children}
    </RequirementContext.Provider>
  );
};

export const useRequirement = () => {
  const context = useContext(RequirementContext);
  if (context === undefined) {
    throw new Error("useRequirement must be used within a RequirementProvider");
  }
  return context;
};
