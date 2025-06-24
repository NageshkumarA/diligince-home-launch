
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle } from 'lucide-react';
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

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {isComplete ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          )}
          Profile Completion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          
          <Progress 
            value={percentage} 
            className="h-2"
            indicatorClassName={isComplete ? "bg-green-500" : "bg-primary"}
          />
          
          {!isComplete && missingFields.length > 0 && (
            <div className="text-sm text-muted-foreground">
              <p>Missing: {missingFields.join(', ')}</p>
            </div>
          )}
          
          {showCompleteButton && !isComplete && (
            <Button 
              onClick={onCompleteProfile}
              size="sm"
              className="w-full"
            >
              Complete Profile
            </Button>
          )}
          
          {isComplete && (
            <div className="text-sm text-green-600 font-medium">
              ✓ Profile is complete!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
