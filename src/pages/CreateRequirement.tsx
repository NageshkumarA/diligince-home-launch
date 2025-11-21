
import React, { useState, lazy, Suspense, useCallback, useEffect, memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Save, MessageSquare, Info, X } from "lucide-react";
import { toast } from "sonner";
import { useRequirementDraft } from "@/hooks/useRequirementDraft";
import { AutoSaveIndicator } from "@/components/requirement/AutoSaveIndicator";
import { ExitDraftDialog } from "@/components/requirement/ExitDraftDialog";
import { CommentsSection } from "@/components/requirement/CommentsSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDistanceToNow } from "date-fns";

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
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isSaving, lastSaved, draftId } = useRequirement();
  const { deleteDraft, loadDraft } = useRequirementDraft();

  // Navigation protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (draftId) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [draftId]);

  // Load draft from URL parameter on mount
  useEffect(() => {
    const urlDraftId = searchParams.get('draftId');
    
    const loadDraftFromUrl = async () => {
      if (urlDraftId && !draftId) {
        try {
          const draftData = await loadDraft(urlDraftId);
          
          // Load the saved step
          const savedStep = localStorage.getItem('requirement-current-step');
          if (savedStep) {
            setCurrentStep(parseInt(savedStep) as StepType);
          }
          
          toast.success("Draft loaded successfully");
        } catch (error) {
          console.error("Failed to load draft from URL:", error);
          toast.error("Failed to load draft. Redirecting...");
          setTimeout(() => navigate('/industry'), 2000);
        }
      }
    };
    
    loadDraftFromUrl();
  }, [searchParams, draftId, loadDraft, navigate]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('requirement-current-step', currentStep.toString());
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as StepType);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = (currentStep - 1) as StepType;
      setCurrentStep(prevStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleGoToStep = useCallback((step: StepType) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDeleteDraft = async () => {
    try {
      if (draftId) {
        await deleteDraft();
        toast.success("Draft deleted successfully");
      }
      navigate("/industry");
    } catch (error) {
      console.error("Failed to delete draft:", error);
      toast.error("Failed to delete draft");
    }
  };

  const handleCloseExitDialog = () => {
    setShowExitDialog(false);
    navigate("/industry");
  };

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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, handleNext, handlePrevious]);

  const handleReturnToDashboard = useCallback(() => {
    localStorage.removeItem('requirement-current-step');
    navigate("/industry-dashboard");
  }, [navigate]);

  const formatLastSaved = () => {
    if (isSaving) return "Saving...";
    if (!lastSaved) return "Not saved yet";
    
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
                  onReturnToDashboard={() => navigate("/industry")} 
                />
                <Toaster richColors position="top-right"/>
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
            <div className="flex min-h-screen flex-col bg-corporate-gray-50">
              {/* Mobile Step Header */}
              <MobileStepHeader
                currentStep={currentStep}
                totalSteps={6}
                stepTitle={currentStepConfig?.title || ""}
                onBack={currentStep > 1 ? handlePrevious : undefined}
                showBackButton={currentStep > 1}
              />

              {/* Main Content */}
              <div className="flex-1 container mx-auto px-4 py-6 md:py-8 md:px-6 md:pt-10">
                {/* Desktop Header */}
                <div className="hidden md:block mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-corporate-gray-900 md:text-4xl">
                        Create Procurement Requirement
                      </h1>
                      <p className="mt-2 text-lg text-corporate-gray-600">
                        Enterprise-grade requirement management system
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {draftId && (
                        <Button
                          variant="outline"
                          onClick={() => setShowComments(!showComments)}
                          className="hidden md:flex items-center gap-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          {showComments ? "Hide Comments" : "Show Comments"}
                        </Button>
                      )}
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
                </div>

                {/* Draft Info Banner */}
                {draftId && (
                  <Alert className="mb-6 border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-900 font-semibold">
                      Editing Draft: {draftId}
                    </AlertTitle>
                    <AlertDescription className="text-blue-700 flex items-center gap-2">
                      <span>Your changes are automatically saved.</span>
                      {lastSaved && (
                        <span className="text-xs text-blue-600">
                          Last saved: {formatDistanceToNow(new Date(lastSaved), { addSuffix: true })}
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Main Content Area with Comments Sidebar */}
                <div className="flex gap-6 relative">
                  {/* Main Form Area */}
                  <div className={showComments ? "w-2/3 transition-all" : "w-full"}>
                    {/* Step Indicator */}
                    <div className="hidden md:block">
                      <RequirementStepIndicator 
                        currentStep={currentStep} 
                        onStepClick={handleGoToStep} 
                      />
                    </div>

                    {/* Step Content with Swipe Support */}
                    <div 
                      {...swipeHandlers}
                      className="mt-6 md:mt-8 rounded-xl bg-white shadow-sm border border-corporate-gray-200 touch-pan-y"
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
                  </div>

                  {/* Comments Sidebar (Desktop) */}
                  {showComments && draftId && (
                    <div className="hidden md:block w-1/3 sticky top-6 h-fit">
                      <CommentsSection
                        requirementId={draftId}
                        title="Draft Comments & Feedback"
                        placeholder="Add notes, questions, or feedback about this draft..."
                      />
                    </div>
                  )}
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

              {/* Floating Comments Button (Mobile) */}
              {draftId && (
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="md:hidden fixed bottom-24 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
                >
                  <MessageSquare className="h-5 w-5" />
                </button>
              )}

              {/* Mobile Comments Drawer */}
              {showComments && draftId && (
                <div 
                  className="md:hidden fixed inset-0 z-50 bg-black/50" 
                  onClick={() => setShowComments(false)}
                >
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[75vh] overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                      <h3 className="font-semibold">Comments & Feedback</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowComments(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <CommentsSection
                        requirementId={draftId}
                        title=""
                        placeholder="Add notes, questions, or feedback..."
                      />
                    </div>
                  </div>
                </div>
              )}

              <Toaster richColors position="top-right"/>
            </div>
          </RequirementProvider>
        </StakeholderProvider>
      </ApprovalProvider>
    </ErrorBoundary>
  );
};

export default CreateRequirement;
