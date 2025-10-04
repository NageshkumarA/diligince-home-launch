import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface MobileStepFooterProps {
  onPrevious?: () => void;
  onNext?: () => void;
  showPrevious?: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
  isLastStep?: boolean;
}

export const MobileStepFooter = ({
  onPrevious,
  onNext,
  showPrevious = true,
  nextLabel = "Next",
  nextDisabled = false,
  isLastStep = false
}: MobileStepFooterProps) => {
  return (
    <div className="sticky bottom-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t md:hidden">
      <div className="flex items-center gap-3 p-4">
        {showPrevious && onPrevious && (
          <Button
            variant="outline"
            onClick={onPrevious}
            className="flex-1"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
        )}
        
        {onNext && (
          <Button
            onClick={onNext}
            disabled={nextDisabled}
            className="flex-1"
          >
            {nextLabel}
            {isLastStep ? (
              <Check className="h-4 w-4 ml-2" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-2" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
