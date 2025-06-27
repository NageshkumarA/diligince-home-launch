
import React from "react";
import { StepType } from "@/pages/CreateRequirement";
import { useRequirement } from "@/contexts/RequirementContext";
import { cn } from "@/lib/utils";
import { 
  Info, 
  FileText, 
  Upload, 
  GitBranch,
  Eye, 
  Send,
  Check
} from "lucide-react";

interface StepIndicatorProps {
  currentStep: StepType;
  onStepClick: (step: StepType) => void;
}

const steps = [
  { 
    id: 1, 
    name: "Basic Info", 
    description: "Project details and requirements",
    icon: Info 
  },
  { 
    id: 2, 
    name: "Details", 
    description: "Specifications and technical requirements",
    icon: FileText 
  },
  { 
    id: 3, 
    name: "Documents", 
    description: "Upload supporting files",
    icon: Upload 
  },
  { 
    id: 4, 
    name: "Workflow", 
    description: "Set approval workflow",
    icon: GitBranch 
  },
  { 
    id: 5, 
    name: "Preview", 
    description: "Review your requirement",
    icon: Eye 
  },
  { 
    id: 6, 
    name: "Publish", 
    description: "Submit and publish requirement",
    icon: Send 
  },
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
      return true; // Workflow setup is optional for some requirements
    } else if (stepId === 5) {
      return true; // Preview is just viewing
    } else if (stepId === 6) {
      return formData.termsAccepted;
    }
    return false;
  };

  const isStepAccessible = (stepId: number) => {
    if (stepId === 1) return true;
    if (stepId >= 2 && !isStepCompleted(1)) return false;
    if (stepId >= 3 && !isStepCompleted(2)) return false;
    if (stepId <= currentStep) return true;
    return stepId === currentStep + 1;
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep || isStepCompleted(stepId)) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  return (
    <div className="w-full py-8">
      {/* Desktop version */}
      <div className="hidden lg:block">
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              const isAccessible = isStepAccessible(step.id);
              const isLastStep = index === steps.length - 1;
              
              return (
                <div key={step.id} className="flex items-center">
                  {/* Step circle and content */}
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => isAccessible && onStepClick(step.id as StepType)}
                      disabled={!isAccessible}
                      className={cn(
                        "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
                        status === "completed" && "bg-green-500 border-green-500 text-white",
                        status === "current" && "bg-blue-500 border-blue-500 text-white",
                        status === "upcoming" && isAccessible && "bg-white border-gray-300 text-gray-600 hover:border-blue-400",
                        status === "upcoming" && !isAccessible && "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      {status === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </button>
                    
                    <div className="mt-3 text-center">
                      <h3 className={cn(
                        "text-sm font-medium",
                        status === "completed" && "text-green-600",
                        status === "current" && "text-blue-600",
                        status === "upcoming" && "text-gray-500"
                      )}>
                        {step.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 max-w-24">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connecting line */}
                  {!isLastStep && (
                    <div className="flex-1 mx-4 h-0.5 bg-gray-200 relative">
                      <div 
                        className={cn(
                          "h-full transition-colors duration-300",
                          status === "completed" || (status === "current" && index < currentStep - 1) 
                            ? "bg-green-500" 
                            : "bg-gray-200"
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="lg:hidden">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Step {currentStep} of {steps.length}
              </h3>
              <p className="text-sm text-gray-600">
                {steps.find(step => step.id === currentStep)?.name}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(((currentStep - 1) / (steps.length - 1)) * 100)}%
              </div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          
          {/* Mobile progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(8, ((currentStep - 1) / (steps.length - 1)) * 100)}%` }}
            />
          </div>

          {/* Step dots */}
          <div className="flex justify-center space-x-3">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => isStepAccessible(step.id) && onStepClick(step.id as StepType)}
                  disabled={!isStepAccessible(step.id)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors duration-200",
                    status === "completed" && "bg-green-500",
                    status === "current" && "bg-blue-500",
                    status === "upcoming" && "bg-gray-300"
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementStepIndicator;
