
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, FilePlus, Home } from "lucide-react";

interface SuccessScreenProps {
  onCreateAnother: () => void;
  onViewRequirement: () => void;
  onReturnToDashboard: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  onCreateAnother,
  onViewRequirement,
  onReturnToDashboard,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <div className="mb-6 rounded-full bg-green-100 p-3">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">Requirement Published!</h2>
      <p className="mb-8 max-w-md text-gray-600">
        Your requirement has been successfully published. You'll be notified when you receive proposals from vendors.
      </p>
      
      <div className="grid w-full max-w-md grid-cols-1 gap-4">
        <Button 
          onClick={onViewRequirement}
          className="flex items-center justify-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          View Published Requirement
        </Button>
        
        <Button 
          onClick={onCreateAnother}
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          <FilePlus className="h-4 w-4" />
          Create Another Requirement
        </Button>
        
        <Button 
          onClick={onReturnToDashboard}
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          <Home className="h-4 w-4" />
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default SuccessScreen;
