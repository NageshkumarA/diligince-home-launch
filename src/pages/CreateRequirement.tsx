
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IndustryHeader from "@/components/industry/IndustryHeader";
import RequirementStepIndicator from "@/components/requirement/RequirementStepIndicator";
import EnhancedBasicInfoStep from "@/components/requirement/steps/EnhancedBasicInfoStep";
import DetailsStep from "@/components/requirement/steps/DetailsStep";
import DocumentsStep from "@/components/requirement/steps/DocumentsStep";
import ApprovalWorkflowStep from "@/components/requirement/steps/ApprovalWorkflowStep";
import PreviewStep from "@/components/requirement/steps/PreviewStep";
import PublishStep from "@/components/requirement/steps/PublishStep";
import SuccessScreen from "@/components/requirement/SuccessScreen";
import { RequirementProvider } from "@/contexts/RequirementContext";
import { Toaster } from "@/components/ui/sonner";

export type StepType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const CreateRequirement = () => {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep((prev) => (prev < 7 ? (prev + 1) as StepType : prev));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev > 1 ? (prev - 1) as StepType : prev));
  };

  const handleGoToStep = (step: StepType) => {
    setCurrentStep(step);
  };

  const handleReturnToDashboard = () => {
    navigate("/");
  };

  return (
    <RequirementProvider>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <IndustryHeader />
        <div className="container mx-auto px-4 py-8 md:px-6 pt-20">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  Create Procurement Requirement
                </h1>
                <p className="mt-2 text-lg text-gray-700">
                  Enterprise-grade requirement management system
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Draft auto-saved</p>
                <p className="text-xs text-gray-400">Last saved: Just now</p>
              </div>
            </div>
          </div>

          <RequirementStepIndicator 
            currentStep={currentStep} 
            onStepClick={handleGoToStep} 
          />

          <div className="mt-8 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="p-8">
              {currentStep === 1 && <EnhancedBasicInfoStep onNext={handleNext} />}
              {currentStep === 2 && (
                <DetailsStep onNext={handleNext} onPrevious={handlePrevious} />
              )}
              {currentStep === 3 && (
                <DocumentsStep onNext={handleNext} onPrevious={handlePrevious} />
              )}
              {currentStep === 4 && (
                <ApprovalWorkflowStep onNext={handleNext} onPrevious={handlePrevious} />
              )}
              {currentStep === 5 && (
                <PreviewStep 
                  onNext={handleNext} 
                  onPrevious={handlePrevious} 
                  onEdit={handleGoToStep} 
                />
              )}
              {currentStep === 6 && (
                <PublishStep onNext={handleNext} onPrevious={handlePrevious} />
              )}
              {currentStep === 7 && (
                <SuccessScreen 
                  onCreateAnother={() => setCurrentStep(1)} 
                  onViewRequirement={() => navigate("/requirements")} 
                  onReturnToDashboard={handleReturnToDashboard} 
                />
              )}
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </RequirementProvider>
  );
};

export default CreateRequirement;
