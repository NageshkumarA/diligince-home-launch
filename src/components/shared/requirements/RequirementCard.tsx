import React from 'react';
import { Calendar, MapPin, DollarSign, Building2, Clock, Users, FileText } from 'lucide-react';
import { RequirementWithAI } from '@/types/requirement-feed';
import { AIRecommendationBadge } from './AIRecommendationBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RequirementCardProps {
  requirement: RequirementWithAI;
  userType: 'professional' | 'service-vendor' | 'product-vendor' | 'logistics-vendor';
  onViewDetails: (id: string) => void;
  onSubmitQuote: (id: string) => void;
  className?: string;
}

export const RequirementCard: React.FC<RequirementCardProps> = ({
  requirement,
  userType,
  onViewDetails,
  onSubmitQuote,
  className,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <Badge variant="secondary" className="bg-primary/10 text-primary">New</Badge>;
      case 'closing-soon': return <Badge variant="destructive">Closing Soon</Badge>;
      case 'invited': return <Badge variant="default" className="bg-green-600">Invited</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'service': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'product': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'logistics': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'professional': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getActionButtonText = () => {
    if (userType === 'professional') return 'Apply Now';
    if (userType === 'logistics-vendor') return 'Send Quote';
    return 'Submit Quote';
  };

  const isRecommended = !!requirement.aiRecommendation;
  const daysLeft = Math.ceil((new Date(requirement.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div 
      className={cn(
        'bg-card border rounded-xl p-6 hover:shadow-md transition-all',
        isRecommended && 'border-primary/30 shadow-sm',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {getStatusBadge(requirement.status)}
            <Badge variant="outline" className={getCategoryColor(requirement.category)}>
              {requirement.category}
            </Badge>
            <Badge variant="outline" className={getPriorityColor(requirement.priority)}>
              {requirement.priority}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
            {requirement.title}
          </h3>
        </div>
        
        {isRecommended && (
          <AIRecommendationBadge
            relevanceScore={requirement.aiRecommendation!.relevanceScore}
            reasoning={requirement.aiRecommendation!.reasoning}
            variant="compact"
            className="flex-shrink-0"
          />
        )}
      </div>

      {/* AI Recommendation Details */}
      {isRecommended && (
        <AIRecommendationBadge
          relevanceScore={requirement.aiRecommendation!.relevanceScore}
          reasoning={requirement.aiRecommendation!.reasoning}
          matchFactors={requirement.aiRecommendation!.matchFactors}
          variant="detailed"
          className="mb-4"
        />
      )}

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {requirement.description}
      </p>

      {/* Key Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-foreground truncate">{requirement.company}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-foreground truncate">{requirement.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-foreground truncate">{requirement.budget}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className={cn(
            "truncate",
            daysLeft <= 3 ? "text-red-600 font-medium" : "text-foreground"
          )}>
            {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground truncate">
            Posted {new Date(requirement.postedDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <span className="text-muted-foreground truncate">
            {requirement.responses} responses
          </span>
        </div>
      </div>

      {/* Requirements Tags */}
      {requirement.requirements.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2">
            <FileText className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Key Requirements:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {requirement.requirements.slice(0, 5).map((req, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
            {requirement.requirements.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{requirement.requirements.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button
          onClick={() => onSubmitQuote(requirement.id)}
          className="flex-1"
          variant={isRecommended ? "default" : "default"}
        >
          {getActionButtonText()}
        </Button>
        <Button
          onClick={() => onViewDetails(requirement.id)}
          variant="outline"
          className="flex-1"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
