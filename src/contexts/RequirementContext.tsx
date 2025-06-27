import React, { createContext, useContext, useState, useCallback } from 'react';

export interface RequirementFormData {
  id?: string;
  title?: string;
  category?: "product" | "service" | "expert" | "logistics";
  priority?: "low" | "medium" | "high" | "critical";
  description?: string;
  specialization?: string;
  productSpecifications?: string;
  quantity?: number;
  serviceDescription?: string;
  scopeOfWork?: string;
  equipmentType?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  documents?: { name: string; url: string; }[];
  submissionDeadline?: Date;
  evaluationCriteria?: string[];
  visibility?: "all" | "selected";
  notifyByEmail?: boolean;
  notifyByApp?: boolean;
  termsAccepted?: boolean;
  budget?: number;
  createdDate?: string;
  deadline?: string;
  applicants?: number;
  complianceRequired?: boolean;
  riskLevel?: "low" | "medium" | "high" | "critical";
  
  // Add new approval-related fields
  isUrgent?: boolean;
  approvalWorkflowId?: string;
  complianceRequired?: boolean;
  approvalStatus?: 'not_required' | 'pending' | 'approved' | 'rejected';
  emergencyPublished?: boolean;
  approvalDeadline?: Date;
}

interface RequirementContextType {
  formData: RequirementFormData;
  updateFormData: (data: Partial<RequirementFormData>) => void;
  resetForm: () => void;
  validateStep: (step: number) => boolean;
  stepErrors: Record<string, string> | null;
  isFormValid: () => boolean;
}

const RequirementContext = createContext<RequirementContextType | undefined>(undefined);

export const RequirementProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<RequirementFormData>({});
  const [stepErrors, setStepErrors] = useState<Record<string, string> | null>(null);

  const updateFormData = useCallback((data: Partial<RequirementFormData>) => {
    console.log("Updating form data:", data);
    setFormData(prev => ({ ...prev, ...data }));
    setStepErrors(null);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({});
    setStepErrors(null);
  }, []);

  const validateStep = useCallback((step: number) => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1: // Basic Info
        if (!formData.title?.trim()) {
          errors.title = "Title is required";
        }
        if (!formData.category) {
          errors.category = "Category is required";
        }
        if (!formData.priority) {
          errors.priority = "Priority is required";
        }
        break;
        
      case 2: // Details
        if (formData.category === "expert") {
          if (!formData.specialization?.trim()) {
            errors.specialization = "Specialization is required";
          }
          if (!formData.description?.trim()) {
            errors.description = "Description is required";
          }
        } else if (formData.category === "product") {
          if (!formData.productSpecifications?.trim()) {
            errors.productSpecifications = "Product specifications are required";
          }
          if (!formData.quantity || formData.quantity <= 0) {
            errors.quantity = "Valid quantity is required";
          }
        } else if (formData.category === "service") {
          if (!formData.serviceDescription?.trim()) {
            errors.serviceDescription = "Service description is required";
          }
          if (!formData.scopeOfWork?.trim()) {
            errors.scopeOfWork = "Scope of work is required";
          }
        } else if (formData.category === "logistics") {
          if (!formData.equipmentType?.trim()) {
            errors.equipmentType = "Equipment type is required";
          }
          if (!formData.pickupLocation?.trim()) {
            errors.pickupLocation = "Pickup location is required";
          }
          if (!formData.deliveryLocation?.trim()) {
            errors.deliveryLocation = "Delivery location is required";
          }
        }
        break;
        
      case 3: // Documents (optional)
        break;
        
      case 4: // Approval Workflow
        // Validation handled by approval context
        break;
        
      case 5: // Preview
        break;
        
      case 6: // Publish
        if (!formData.submissionDeadline) {
          errors.submissionDeadline = "Submission deadline is required";
        }
        if (!formData.evaluationCriteria || formData.evaluationCriteria.length === 0) {
          errors.evaluationCriteria = "At least one evaluation criterion must be selected";
        }
        if (!formData.termsAccepted) {
          errors.termsAccepted = "You must accept the terms and conditions";
        }
        break;
    }

    setStepErrors(Object.keys(errors).length > 0 ? errors : null);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const isFormValid = useCallback(() => {
    // Check all required steps
    for (let step = 1; step <= 6; step++) {
      if (!validateStep(step)) {
        return false;
      }
    }
    return true;
  }, [validateStep]);

  return (
    <RequirementContext.Provider value={{
      formData,
      updateFormData,
      resetForm,
      validateStep,
      stepErrors,
      isFormValid
    }}>
      {children}
    </RequirementContext.Provider>
  );
};

export const useRequirement = () => {
  const context = useContext(RequirementContext);
  if (context === undefined) {
    throw new Error('useRequirement must be used within a RequirementProvider');
  }
  return context;
};
