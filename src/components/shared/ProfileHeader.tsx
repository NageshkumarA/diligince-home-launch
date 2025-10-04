import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  type: string;
  specialization?: string;
  initials: string;
  isVerified?: boolean;
  profileCompletion: number;
  missingFields?: string[];
}

export const ProfileHeader = ({
  name,
  type,
  specialization,
  initials,
  isVerified = false,
  profileCompletion,
  missingFields = []
}: ProfileHeaderProps) => {
  return (
    <Card className="mb-6">
      <div className="flex items-center gap-6 p-6">
        <div className="relative">
          <Avatar className="h-24 w-24 bg-primary/10">
            <AvatarFallback className="text-primary text-2xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {isVerified && (
            <div className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-1">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">{name}</h1>
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary">{type}</Badge>
            {specialization && (
              <Badge variant="outline">{specialization}</Badge>
            )}
          </div>
          
          <div className="space-y-2 max-w-md">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Profile Completion</span>
              <span className="text-primary font-medium">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
            {profileCompletion < 100 && missingFields.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Complete: {missingFields.slice(0, 2).join(', ')}
                {missingFields.length > 2 && ` +${missingFields.length - 2} more`}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
