import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle } from 'lucide-react';
import { getMissingFields } from '@/utils/profileValidation';
import { CompanyProfile } from '@/types/verification';

interface ProfileCompletionBannerProps {
  profile: Partial<CompanyProfile> | null;
  completionPercentage: number;
}

export const ProfileCompletionBanner = ({ profile, completionPercentage }: ProfileCompletionBannerProps) => {
  const missingFields = getMissingFields(profile);
  const isComplete = completionPercentage === 100;
  
  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Profile Completion</h3>
            <p className="text-sm text-muted-foreground">
              {isComplete 
                ? "Your profile is ready for verification!" 
                : `Complete ${missingFields.length} more field${missingFields.length !== 1 ? 's' : ''} to verify`}
            </p>
          </div>
          
          <div className="text-right">
            <div className={`text-3xl font-bold ${isComplete ? 'text-green-600' : 'text-blue-600'}`}>
              {completionPercentage}%
            </div>
            <Progress value={completionPercentage} className="w-48 mt-2" />
          </div>
        </div>
        
        {/* Missing Fields List */}
        {!isComplete && missingFields.length > 0 && (
          <div className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
            <p className="text-sm font-medium mb-2">Required fields:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {missingFields.map((field, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{field}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Complete Checklist */}
        {isComplete && (
          <div className="mt-4 flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">All required fields completed!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
