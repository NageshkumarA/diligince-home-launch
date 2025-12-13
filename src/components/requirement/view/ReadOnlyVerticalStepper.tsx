import React from 'react';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  ClipboardList, 
  Paperclip, 
  Shield,
  Check
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface ReadOnlyVerticalStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps: Step[] = [
  { id: 1, title: 'Basic Info', icon: <FileText className="w-4 h-4" /> },
  { id: 2, title: 'Details & Specs', icon: <ClipboardList className="w-4 h-4" /> },
  { id: 3, title: 'Documents', icon: <Paperclip className="w-4 h-4" /> },
  { id: 4, title: 'Approval', icon: <Shield className="w-4 h-4" /> },
];

export const ReadOnlyVerticalStepper: React.FC<ReadOnlyVerticalStepperProps> = ({
  currentStep,
  onStepClick
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Sections
        </h3>
      </div>
      
      <div className="space-y-1">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left",
                "hover:bg-muted/50",
                isActive && "bg-primary/10 border-l-2 border-primary",
                !isActive && "border-l-2 border-transparent"
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                isActive && "bg-primary text-primary-foreground",
                isCompleted && "bg-primary/20 text-primary",
                !isActive && !isCompleted && "bg-muted text-muted-foreground"
              )}>
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </div>
              
              <span className={cn(
                "text-sm font-medium transition-colors",
                isActive && "text-primary",
                !isActive && "text-muted-foreground"
              )}>
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReadOnlyVerticalStepper;
