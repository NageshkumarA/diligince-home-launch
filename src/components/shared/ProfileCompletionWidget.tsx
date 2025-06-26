
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { ProfileCompletion } from '@/utils/profileCompleteness';

interface ProfileCompletionWidgetProps {
  completion: ProfileCompletion;
  onCompleteProfile: () => void;
  showCompleteButton?: boolean;
}

export const ProfileCompletionWidget: React.FC<ProfileCompletionWidgetProps> = ({
  completion,
  onCompleteProfile,
  showCompleteButton = true
}) => {
  const { percentage, isComplete, missingFields } = completion;

  console.log("ProfileCompletionWidget received:", completion);

  // Don't render if no completion data
  if (!completion || percentage === undefined) {
    console.log("No completion data, not rendering widget");
    return null;
  }

  const getStatusIcon = () => {
    if (isComplete) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (percentage < 25) {
      return <Info className="h-5 w-5 text-blue-500" />;
    } else {
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    }
  };

  const getStatusMessage = () => {
    if (isComplete) {
      return "Profile is complete!";
    } else if (percentage < 25) {
      return "Let's get started with your profile";
    } else if (percentage < 50) {
      return "Good progress! Keep going";
    } else if (percentage < 75) {
      return "Almost there!";
    } else {
      return "Just a few more details needed";
    }
  };

  const getProgressColor = () => {
    if (isComplete) return "bg-green-500";
    if (percentage < 25) return "bg-blue-500";
    if (percentage < 50) return "bg-yellow-500";
    if (percentage < 75) return "bg-orange-500";
    return "bg-primary";
  };

  return (
    <Card className="mb-6 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {getStatusIcon()}
          Profile Completion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{getStatusMessage()}</span>
            <span className="font-bold text-lg">{percentage}%</span>
          </div>
          
          <Progress 
            value={percentage} 
            className="h-3"
            indicatorClassName={getProgressColor()}
          />
          
          {!isComplete && missingFields.length > 0 && (
            <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-md">
              <p className="font-medium mb-1">Still needed:</p>
              <p>{missingFields.map(field => {
                // Convert field names to readable labels
                const fieldLabels: Record<string, string> = {
                  businessName: 'Business Name',
                  specialization: 'Specialization',
                  phone: 'Phone Number',
                  name: 'Name',
                  email: 'Email',
                  address: 'Address',
                  registrationNumber: 'Registration Number'
                };
                return fieldLabels[field] || field;
              }).join(', ')}</p>
            </div>
          )}
          
          {showCompleteButton && !isComplete && (
            <Button 
              onClick={onCompleteProfile}
              size="sm"
              className="w-full"
            >
              Complete Profile ({100 - percentage}% remaining)
            </Button>
          )}
          
          {isComplete && (
            <div className="text-sm text-green-600 font-medium bg-green-50 p-3 rounded-md text-center">
              ✓ Excellent! Your profile is complete and optimized for maximum visibility.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
