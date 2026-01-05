import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Bookmark, 
  BookmarkCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { RFQBrowseItem } from '@/types/rfq-browse';
import { cn } from '@/lib/utils';

interface RFQBrowseCardProps {
  rfq: RFQBrowseItem;
  onViewDetails: (rfq: RFQBrowseItem) => void;
  onSubmitQuote: (rfq: RFQBrowseItem) => void;
  onToggleSave: (rfq: RFQBrowseItem) => void;
}

const priorityConfig = {
  critical: { label: 'Critical', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  high: { label: 'High', className: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
  medium: { label: 'Medium', className: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  low: { label: 'Low', className: 'bg-muted text-muted-foreground border-border' }
};

const categoryConfig = {
  service: { label: 'Service', className: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  product: { label: 'Product', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  logistics: { label: 'Logistics', className: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  professional: { label: 'Professional', className: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' }
};

const RFQBrowseCard: React.FC<RFQBrowseCardProps> = ({
  rfq,
  onViewDetails,
  onSubmitQuote,
  onToggleSave
}) => {
  const priority = priorityConfig[rfq.priority];
  const category = categoryConfig[rfq.category];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-200 border",
      rfq.isClosingSoon && "border-orange-300 bg-orange-50/30",
      rfq.hasApplied && "border-green-300 bg-green-50/30"
    )}>
      <CardContent className="p-5">
        {/* Header with badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={category.className}>
              {category.label}
            </Badge>
            <Badge variant="outline" className={priority.className}>
              {priority.label}
            </Badge>
            {rfq.isClosingSoon && (
              <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                <AlertCircle className="w-3 h-3 mr-1" />
                Closing Soon
              </Badge>
            )}
            {rfq.hasApplied && (
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Applied
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(rfq);
            }}
          >
            {rfq.isSaved ? (
              <BookmarkCheck className="w-4 h-4 text-primary" />
            ) : (
              <Bookmark className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>

        {/* AI Recommendation Badge */}
        {rfq.aiRecommendation && (
          <div className="mb-3 px-3 py-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-xs font-medium text-violet-700">
                {rfq.aiRecommendation.score}% Match
              </span>
              <span className="text-xs text-violet-600">
                — {rfq.aiRecommendation.reasoning}
              </span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="font-semibold text-foreground text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {rfq.title}
        </h3>

        {/* Company */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Building2 className="w-4 h-4" />
          <span className="truncate">{rfq.company.name}</span>
          {rfq.company.verified && (
            <Badge variant="secondary" className="h-5 text-xs px-1.5">
              Verified
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {rfq.description}
        </p>

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="truncate text-muted-foreground">
              {rfq.location.city}, {rfq.location.state}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className={cn(
              "truncate",
              rfq.isClosingSoon ? "text-orange-600 font-medium" : "text-muted-foreground"
            )}>
              {formatDate(rfq.deadline)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className={cn(
              rfq.daysLeft <= 3 ? "text-orange-600 font-medium" : "text-muted-foreground"
            )}>
              {rfq.daysLeft} days left
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {rfq.responses} responses
            </span>
          </div>
        </div>

        {/* Budget */}
        <div className="px-3 py-2 bg-muted/50 rounded-lg mb-4">
          <div className="text-xs text-muted-foreground mb-0.5">Budget Range</div>
          <div className="font-semibold text-foreground">{rfq.budget.display}</div>
        </div>

        {/* Skills */}
        {rfq.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {rfq.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs font-normal">
                {skill}
              </Badge>
            ))}
            {rfq.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{rfq.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(rfq)}
          >
            View Details
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onSubmitQuote(rfq)}
            disabled={rfq.hasApplied}
          >
            {rfq.hasApplied ? 'Quote Submitted' : 'Submit Quote'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RFQBrowseCard;
