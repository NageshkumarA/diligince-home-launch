
import React, { createContext, useContext, useState } from "react";

export type RequirementCategory = "expert" | "product" | "service" | "logistics";
export type PriorityLevel = "critical" | "high" | "medium" | "low";
export type ApprovalStatus = "draft" | "pending_review" | "pending_approval" | "approved" | "rejected" | "published";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  documentType: "specification" | "drawing" | "reference" | "compliance" | "other";
  version: number;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface ApprovalStep {
  id: string;
  stepName: string;
  approverRole: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedAt?: Date;
  comments?: string;
  required: boolean;
}

export interface RequirementFormData {
  // Basic Info (Step 1)
  title: string;
  category: RequirementCategory | null;
  priority: PriorityLevel;
  urgency: boolean;
  
  // Enterprise Fields
  costCenter: string;
  department: string;
  requestedBy: string;
  businessJustification: string;
  estimatedBudget: number;
  budgetApproved: boolean;
  complianceRequired: boolean;
  riskLevel: RiskLevel;
  
  // Details (Step 2) - existing fields
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
  technicalStandards?: string[];
  
  // Service
  serviceDescription?: string;
  scopeOfWork?: string;
  serviceStartDate?: Date | null;
  serviceEndDate?: Date | null;
  serviceBudget?: number;
  location?: string;
  performanceMetrics?: string;
  
  // Logistics
  equipmentType?: string;
  weight?: number;
  dimensions?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  pickupDate?: Date | null;
  deliveryDate?: Date | null;
  specialHandling?: string;
  insuranceRequired?: boolean;
  
  // Documents (Step 3)
  documents: DocumentFile[];
  
  // Approval Workflow (Step 4)
  approvalSteps: ApprovalStep[];
  currentApprovalStep: number;
  approvalStatus: ApprovalStatus;
  
  // Publish (Step 5)
  visibility: "all" | "selected" | "prequalified";
  selectedVendors?: string[];
  vendorCriteria?: string[];
  submissionDeadline?: Date | null;
  evaluationCriteria: string[];
  notifyByEmail: boolean;
  notifyByApp: boolean;
  termsAccepted: boolean;
  
  // Compliance & Audit
  complianceChecklist: { item: string; completed: boolean; verifiedBy?: string }[];
  auditTrail: { action: string; timestamp: Date; user: string; details: string }[];
}

const initialFormData: RequirementFormData = {
  title: "",
  category: null,
  priority: "medium",
  urgency: false,
  costCenter: "",
  department: "",
  requestedBy: "",
  businessJustification: "",
  estimatedBudget: 0,
  budgetApproved: false,
  complianceRequired: false,
  riskLevel: "low",
  documents: [],
  approvalSteps: [],
  currentApprovalStep: 0,
  approvalStatus: "draft",
  visibility: "all",
  evaluationCriteria: [],
  notifyByEmail: true,
  notifyByApp: true,
  termsAccepted: false,
  complianceChecklist: [],
  auditTrail: [],
};

interface RequirementContextType {
  formData: RequirementFormData;
  updateFormData: (data: Partial<RequirementFormData>) => void;
  resetFormData: () => void;
  validateStep: (step: number) => boolean;
  stepErrors: Record<string, string>;
  saveAsDraft: () => void;
  submitForApproval: () => void;
  addAuditEntry: (action: string, details: string) => void;
}

const RequirementContext = createContext<RequirementContextType | undefined>(undefined);

export const RequirementProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<RequirementFormData>(initialFormData);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const updateFormData = (data: Partial<RequirementFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    addAuditEntry("Field Updated", `Updated: ${Object.keys(data).join(", ")}`);
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  const addAuditEntry = (action: string, details: string) => {
    const entry = {
      action,
      timestamp: new Date(),
      user: "Current User", // Would be replaced with actual user context
      details,
    };
    setFormData(prev => ({
      ...prev,
      auditTrail: [...prev.auditTrail, entry]
    }));
  };

  const saveAsDraft = () => {
    addAuditEntry("Draft Saved", "Requirement saved as draft");
    // In real implementation, would save to backend
  };

  const submitForApproval = () => {
    setFormData(prev => ({
      ...prev,
      approvalStatus: "pending_review"
    }));
    addAuditEntry("Submitted for Approval", "Requirement submitted for review and approval");
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
      if (!formData.costCenter.trim()) {
        errors.costCenter = "Cost center is required";
        isValid = false;
      }
      if (!formData.department.trim()) {
        errors.department = "Department is required";
        isValid = false;
      }
      if (!formData.businessJustification.trim()) {
        errors.businessJustification = "Business justification is required";
        isValid = false;
      }
      if (formData.estimatedBudget <= 0) {
        errors.estimatedBudget = "Estimated budget must be greater than 0";
        isValid = false;
      }
    } else if (step === 2) {
      // Category-specific validation with enhanced enterprise requirements
      if (formData.category === "expert") {
        if (!formData.specialization) {
          errors.specialization = "Specialization is required";
          isValid = false;
        }
        if (!formData.description) {
          errors.description = "Detailed description is required";
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
        if (!formData.technicalStandards || formData.technicalStandards.length === 0) {
          errors.technicalStandards = "Technical standards must be specified";
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
        if (!formData.performanceMetrics) {
          errors.performanceMetrics = "Performance metrics are required";
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
    } else if (step === 4) {
      // Approval workflow validation
      if (formData.estimatedBudget > 50000 && formData.approvalSteps.length === 0) {
        errors.approvalSteps = "Approval workflow is required for budgets over $50,000";
        isValid = false;
      }
    } else if (step === 5) {
      if (!formData.submissionDeadline) {
        errors.submissionDeadline = "Submission deadline is required";
        isValid = false;
      }
      if (formData.evaluationCriteria.length === 0) {
        errors.evaluationCriteria = "At least one evaluation criterion is required";
        isValid = false;
      }
      if (!formData.termsAccepted) {
        errors.termsAccepted = "You must accept the terms and conditions";
        isValid = false;
      }
      if (formData.complianceRequired && formData.complianceChecklist.some(item => !item.completed)) {
        errors.complianceChecklist = "All compliance items must be completed";
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
        saveAsDraft,
        submitForApproval,
        addAuditEntry,
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
