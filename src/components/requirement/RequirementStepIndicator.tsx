
import React from "react";
import { StepType } from "@/pages/CreateRequirement";
import { useRequirement } from "@/contexts/RequirementContext";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: StepType;
  onStepClick: (step: StepType) => void;
}

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Details" },
  { id: 3, name: "Documents" },
  { id: 4, name: "Preview" },
  { id: 5, name: "Publish" },
];

const RequirementStepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onStepClick,
}) => {
  const { formData } = useRequirement();

  const isStepCompleted = (stepId: number) => {
    if (stepId === 1) {
      return !!formData.title && !!formData.category;
    } else if (stepId === 2) {
      if (formData.category === "expert") {
        return !!formData.specialization && !!formData.description;
      } else if (formData.category === "product") {
        return !!formData.productSpecifications && !!formData.quantity;
      } else if (formData.category === "service") {
        return !!formData.serviceDescription && !!formData.scopeOfWork;
      } else if (formData.category === "logistics") {
        return !!formData.equipmentType && !!formData.pickupLocation && !!formData.deliveryLocation;
      }
      return false;
    } else if (stepId === 3) {
      return true; // Documents are optional
    } else if (stepId === 4) {
      return true; // Preview is just viewing
    } else if (stepId === 5) {
      return formData.termsAccepted;
    }
    return false;
  };

  const isStepAccessible = (stepId: number) => {
    // Step 1 is always accessible
    if (stepId === 1) return true;
    
    // For steps 2-5, you need to have completed step 1
    if (stepId >= 2 && !isStepCompleted(1)) return false;
    
    // For steps 3-5, you need to have completed step 2
    if (stepId >= 3 && !isStepCompleted(2)) return false;
    
    // Step 6 is only accessible after publishing
    if (stepId === 6) return false;
    
    // Current step and previous steps are always accessible
    if (stepId <= currentStep) return true;
    
    // Future steps are accessible if their prerequisites are met
    // For simplicity, we'll allow access to the next step
    return stepId === currentStep + 1;
  };

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <li className={cn(
                  "relative flex items-center",
                  index === 0 ? "pr-8" : "px-8",
                  index === steps.length - 1 ? "w-10" : "w-full"
                )}>
                  <button
                    type="button"
                    onClick={() => isStepAccessible(step.id) && onStepClick(step.id as StepType)}
                    className={cn(
                      "group relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 font-medium focus:outline-none",
                      step.id < currentStep || isStepCompleted(step.id)
                        ? "border-blue-600 bg-blue-600 text-white"
                        : step.id === currentStep
                        ? "border-blue-600 bg-white text-blue-600"
                        : "border-gray-300 bg-white text-gray-500",
                      !isStepAccessible(step.id) && "cursor-not-allowed opacity-50"
                    )}
                    disabled={!isStepAccessible(step.id)}
                  >
                    <span className="text-sm">{step.id}</span>
                  </button>
                  <div className="absolute -bottom-8 text-center" style={{ width: "100px", marginLeft: "-45px" }}>
                    <span className="text-xs font-medium text-gray-700">{step.name}</span>
                  </div>
                  {index !== steps.length - 1 && (
                    <div className={cn(
                      "absolute right-0 top-0 hidden h-0.5 w-full md:block",
                      step.id < currentStep
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    )} style={{ transform: "translateY(20px)" }} />
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {steps.find(step => step.id === currentStep)?.name}
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default RequirementStepIndicator;
