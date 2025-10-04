
import React, { useState, lazy, Suspense, useCallback, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import IndustryHeader from "@/components/industry/IndustryHeader";
import RequirementStepIndicator from "@/components/requirement/RequirementStepIndicator";
import { StepLoadingSkeleton } from "@/components/requirement/StepLoadingSkeleton";
import { MobileStepHeader } from "@/components/requirement/MobileStepHeader";
import { MobileStepFooter } from "@/components/requirement/MobileStepFooter";
import SuccessScreen from "@/components/requirement/SuccessScreen";
import { RequirementProvider, useRequirement } from "@/contexts/RequirementContext";
import { StakeholderProvider } from "@/contexts/StakeholderContext";
import { ApprovalProvider } from "@/contexts/ApprovalContext";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { Save } from "lucide-react";
import { toast } from "sonner";

// Lazy load step components for better performance
const EnhancedBasicInfoStep = lazy(() => import("@/components/requirement/steps/EnhancedBasicInfoStep"));
const DetailsStep = lazy(() => import("@/components/requirement/steps/DetailsStep"));
const DocumentsStep = lazy(() => import("@/components/requirement/steps/DocumentsStep"));
const ApprovalWorkflowStep = lazy(() => import("@/components/requirement/steps/ApprovalWorkflowStep"));
const PreviewStep = lazy(() => import("@/components/requirement/steps/PreviewStep"));
const PublishStep = lazy(() => import("@/components/requirement/steps/PublishStep"));

export type StepType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Step configuration
const steps = [
  { id: 1, title: "Basic Information", component: EnhancedBasicInfoStep },
  { id: 2, title: "Requirements Details", component: DetailsStep },
  { id: 3, title: "Documents & Attachments", component: DocumentsStep },
  { id: 4, title: "Approval Workflow", component: ApprovalWorkflowStep },
  { id: 5, title: "Preview & Review", component: PreviewStep },
  { id: 6, title: "Publish Requirement", component: PublishStep },
];

// Memoized step renderer
const StepRenderer = memo(({ currentStep, handleNext, handlePrevious, handleGoToStep }: {
  currentStep: StepType;
  handleNext: () => void;
  handlePrevious: () => void;
  handleGoToStep: (step: StepType) => void;
}) => {
  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <EnhancedBasicInfoStep onNext={handleNext} />;
      case 2:
        return <DetailsStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <DocumentsStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <ApprovalWorkflowStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 5:
        return (
          <PreviewStep 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
            onEdit={handleGoToStep} 
          />
        );
      case 6:
        return <PublishStep onNext={handleNext} onPrevious={handlePrevious} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <Suspense fallback={<StepLoadingSkeleton />}>
      {renderStep()}
    </Suspense>
  );
});

StepRenderer.displayName = "StepRenderer";

const CreateRequirement = () => {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const navigate = useNavigate();

  // Save to localStorage on form data change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const formDataStr = localStorage.getItem('requirement-draft');
      if (formDataStr) {
        setLastSaved(new Date());
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Restore progress on mount
  useEffect(() => {
    const savedStep = localStorage.getItem('requirement-current-step');
    if (savedStep) {
      const step = parseInt(savedStep, 10);
      if (step >= 1 && step <= 7) {
        setCurrentStep(step as StepType);
      }
    }
  }, []);

  // Save current step to localStorage
  useEffect(() => {
    localStorage.setItem('requirement-current-step', currentStep.toString());
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (currentStep < 7) {
      const nextStep = (currentStep + 1) as StepType;
      setCurrentStep(nextStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = (currentStep - 1) as StepType;
      setCurrentStep(prevStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleGoToStep = useCallback((step: StepType) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Swipe gestures for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentStep < 6) {
        handleNext();
      }
    },
    onSwipedRight: () => {
      if (currentStep > 1) {
        handlePrevious();
      }
    },
    trackMouse: false,
    trackTouch: true,
    delta: 50,
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Arrow keys for navigation
      if (e.altKey) {
        if (e.key === 'ArrowRight' && currentStep < 6) {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'ArrowLeft' && currentStep > 1) {
          e.preventDefault();
          handlePrevious();
        }
      }
      
      // Ctrl/Cmd + S for manual save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        localStorage.setItem('requirement-draft', JSON.stringify({}));
        setLastSaved(new Date());
        toast.success("Draft saved successfully");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, handleNext, handlePrevious]);

  const handleReturnToDashboard = useCallback(() => {
    localStorage.removeItem('requirement-current-step');
    navigate("/industry-dashboard");
  }, [navigate]);

  const formatLastSaved = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000);
    
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return lastSaved.toLocaleString();
  };

  const currentStepConfig = steps.find(s => s.id === currentStep);

  // Success screen (Step 7)
  if (currentStep === 7) {
    return (
      <ErrorBoundary>
        <ApprovalProvider>
          <StakeholderProvider>
            <RequirementProvider>
              <div className="flex min-h-screen flex-col bg-background">
                <SuccessScreen 
                  onCreateAnother={() => {
                    setCurrentStep(1);
                    localStorage.removeItem('requirement-current-step');
                  }}
                  onViewRequirement={() => navigate("/industry-requirements")} 
                  onReturnToDashboard={handleReturnToDashboard} 
                />
                <Toaster />
              </div>
            </RequirementProvider>
          </StakeholderProvider>
        </ApprovalProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ApprovalProvider>
        <StakeholderProvider>
          <RequirementProvider>
            <div className="flex min-h-screen flex-col bg-gray-50">
              {/* Mobile Step Header */}
              <MobileStepHeader
                currentStep={currentStep}
                totalSteps={6}
                stepTitle={currentStepConfig?.title || ""}
                onBack={currentStep > 1 ? handlePrevious : undefined}
                showBackButton={currentStep > 1}
              />

              {/* Main Content */}
              <div className="flex-1 container mx-auto px-4 py-6 md:py-8 md:px-6 md:pt-20">
                {/* Desktop Header */}
                <div className="hidden md:block mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                        Create Procurement Requirement
                      </h1>
                      <p className="mt-2 text-lg text-muted-foreground">
                        Enterprise-grade requirement management system
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      <Save className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Auto-saving</p>
                        <p className="text-xs text-muted-foreground/70">
                          Last saved: {formatLastSaved()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Indicator */}
                <RequirementStepIndicator 
                  currentStep={currentStep} 
                  onStepClick={handleGoToStep} 
                />

                {/* Step Content with Swipe Support */}
                <div 
                  {...swipeHandlers}
                  className="mt-6 md:mt-8 rounded-xl bg-white shadow-sm border border-gray-200 touch-pan-y"
                >
                  <div className="p-4 md:p-8">
                    <StepRenderer
                      currentStep={currentStep}
                      handleNext={handleNext}
                      handlePrevious={handlePrevious}
                      handleGoToStep={handleGoToStep}
                    />
                  </div>
                </div>

                {/* Keyboard shortcuts hint (desktop only) */}
                <div className="hidden md:block mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Tip: Use Alt + Arrow keys to navigate • Ctrl/Cmd + S to save
                  </p>
                </div>
              </div>

              {/* Mobile Step Footer */}
              <MobileStepFooter
                onPrevious={currentStep > 1 ? handlePrevious : undefined}
                onNext={currentStep < 6 ? handleNext : undefined}
                showPrevious={currentStep > 1}
                nextLabel={currentStep === 6 ? "Publish" : "Next"}
                isLastStep={currentStep === 6}
              />

              <Toaster />
            </div>
          </RequirementProvider>
        </StakeholderProvider>
      </ApprovalProvider>
    </ErrorBoundary>
  );
};

export default CreateRequirement;
