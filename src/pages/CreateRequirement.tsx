
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequirementHeader from "@/components/requirement/RequirementHeader";
import RequirementStepIndicator from "@/components/requirement/RequirementStepIndicator";
import BasicInfoStep from "@/components/requirement/steps/BasicInfoStep";
import DetailsStep from "@/components/requirement/steps/DetailsStep";
import DocumentsStep from "@/components/requirement/steps/DocumentsStep";
import PreviewStep from "@/components/requirement/steps/PreviewStep";
import PublishStep from "@/components/requirement/steps/PublishStep";
import SuccessScreen from "@/components/requirement/SuccessScreen";
import { RequirementProvider } from "@/contexts/RequirementContext";
import { Toaster } from "@/components/ui/sonner";

export type StepType = 1 | 2 | 3 | 4 | 5 | 6;

const CreateRequirement = () => {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep((prev) => (prev < 6 ? (prev + 1) as StepType : prev));
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
        <RequirementHeader />
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Create New Requirement
            </h1>
            <p className="mt-2 text-gray-600">
              Complete the form below to create a new procurement requirement
            </p>
          </div>

          <RequirementStepIndicator 
            currentStep={currentStep} 
            onStepClick={handleGoToStep} 
          />

          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
            {currentStep === 1 && <BasicInfoStep onNext={handleNext} />}
            {currentStep === 2 && (
              <DetailsStep onNext={handleNext} onPrevious={handlePrevious} />
            )}
            {currentStep === 3 && (
              <DocumentsStep onNext={handleNext} onPrevious={handlePrevious} />
            )}
            {currentStep === 4 && (
              <PreviewStep 
                onNext={handleNext} 
                onPrevious={handlePrevious} 
                onEdit={handleGoToStep} 
              />
            )}
            {currentStep === 5 && (
              <PublishStep onNext={handleNext} onPrevious={handlePrevious} />
            )}
            {currentStep === 6 && (
              <SuccessScreen 
                onCreateAnother={() => setCurrentStep(1)} 
                onViewRequirement={() => navigate("/requirements")} 
                onReturnToDashboard={handleReturnToDashboard} 
              />
            )}
          </div>
        </div>
        <Toaster />
      </div>
    </RequirementProvider>
  );
};

export default CreateRequirement;
