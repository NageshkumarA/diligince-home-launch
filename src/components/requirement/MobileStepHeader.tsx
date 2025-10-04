import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileStepHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const MobileStepHeader = ({ 
  currentStep, 
  totalSteps, 
  stepTitle,
  onBack,
  showBackButton = true
}: MobileStepHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b md:hidden">
      <div className="flex items-center gap-3 p-4">
        {showBackButton && onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </p>
          <h2 className="text-base font-semibold truncate">
            {stepTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};
