
import React from "react";
import { StepType } from "@/pages/CreateRequirement";
import { useRequirement } from "@/contexts/RequirementContext";
import { cn } from "@/lib/utils";
import { 
  Info, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Eye, 
  Send,
  Circle,
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
    name: "Preview", 
    description: "Review your requirement",
    icon: Eye 
  },
  { 
    id: 5, 
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
      return true; // Preview is just viewing
    } else if (stepId === 5) {
      return formData.termsAccepted;
    }
    return false;
  };

  const isStepAccessible = (stepId: number) => {
    if (stepId === 1) return true;
    if (stepId >= 2 && !isStepCompleted(1)) return false;
    if (stepId >= 3 && !isStepCompleted(2)) return false;
    if (stepId === 6) return false;
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
        <div className="relative">
          {/* Progress line background */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 rounded-full">
            {/* Active progress line */}
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-out"
              style={{ 
                width: `${Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100)}%` 
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              const isAccessible = isStepAccessible(step.id);
              
              return (
                <div key={step.id} className="flex flex-col items-center group">
                  {/* Step circle */}
                  <button
                    type="button"
                    onClick={() => isAccessible && onStepClick(step.id as StepType)}
                    disabled={!isAccessible}
                    className={cn(
                      "relative flex items-center justify-center w-24 h-24 rounded-full border-4 transition-all duration-300 transform group-hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200",
                      status === "completed" && "bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 text-white shadow-lg shadow-green-200",
                      status === "current" && "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-500 text-white shadow-xl shadow-blue-200 animate-pulse",
                      status === "upcoming" && isAccessible && "bg-white border-gray-300 text-gray-600 hover:border-blue-300 hover:shadow-lg",
                      status === "upcoming" && !isAccessible && "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                    )}
                  >
                    {/* Background glow effect for current step */}
                    {status === "current" && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 opacity-75 animate-ping" />
                    )}
                    
                    {/* Icon or check mark */}
                    <div className="relative z-10">
                      {status === "completed" ? (
                        <Check className="w-8 h-8" />
                      ) : (
                        <Icon className="w-8 h-8" />
                      )}
                    </div>

                    {/* Step number badge */}
                    <div className={cn(
                      "absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                      status === "completed" && "bg-green-600 border-green-400 text-white",
                      status === "current" && "bg-blue-600 border-blue-400 text-white",
                      status === "upcoming" && "bg-gray-200 border-gray-300 text-gray-600"
                    )}>
                      {step.id}
                    </div>
                  </button>

                  {/* Step info */}
                  <div className="mt-6 text-center max-w-32">
                    <h3 className={cn(
                      "text-sm font-semibold transition-colors duration-200",
                      status === "completed" && "text-green-700",
                      status === "current" && "text-blue-700",
                      status === "upcoming" && "text-gray-600"
                    )}>
                      {step.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-tight">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover tooltip */}
                  <div className="absolute top-32 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-gray-900 text-white text-xs py-2 px-3 rounded-lg shadow-lg whitespace-nowrap">
                      {step.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tablet version */}
      <div className="hidden md:block lg:hidden">
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="relative flex justify-between">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;
              const isAccessible = isStepAccessible(step.id);
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <button
                    onClick={() => isAccessible && onStepClick(step.id as StepType)}
                    disabled={!isAccessible}
                    className={cn(
                      "w-16 h-16 rounded-full border-3 flex items-center justify-center transition-all duration-200",
                      status === "completed" && "bg-green-500 border-green-500 text-white",
                      status === "current" && "bg-blue-500 border-blue-500 text-white shadow-lg",
                      status === "upcoming" && isAccessible && "bg-white border-gray-300 text-gray-600 hover:border-blue-300",
                      status === "upcoming" && !isAccessible && "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                    )}
                  >
                    {status === "completed" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </button>
                  <div className="mt-3 text-center">
                    <span className="text-xs font-medium text-gray-600">
                      {step.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="md:hidden">
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
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-1"
              style={{ width: `${Math.max(8, ((currentStep - 1) / (steps.length - 1)) * 100)}%` }}
            >
              <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
            </div>
          </div>

          {/* Step dots */}
          <div className="flex justify-center space-x-2">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => isStepAccessible(step.id) && onStepClick(step.id as StepType)}
                  disabled={!isStepAccessible(step.id)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-200",
                    status === "completed" && "bg-green-500",
                    status === "current" && "bg-blue-500 ring-2 ring-blue-200",
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
