import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIRecommendationBadgeProps {
  relevanceScore: number;
  reasoning: string;
  matchFactors?: string[];
  variant?: 'compact' | 'detailed';
  className?: string;
}

export const AIRecommendationBadge: React.FC<AIRecommendationBadgeProps> = ({
  relevanceScore,
  reasoning,
  matchFactors = [],
  variant = 'compact',
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 75) return 'text-primary bg-primary/10 border-primary/20';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-muted-foreground bg-muted border-border';
  };

  if (variant === 'compact') {
    return (
      <div 
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border',
          getScoreColor(relevanceScore),
          className
        )}
        title={reasoning}
      >
        <Star className="w-3.5 h-3.5 fill-current" />
        <span>{relevanceScore}% Match</span>
      </div>
    );
  }

  return (
    <div className={cn('bg-card border border-border rounded-lg p-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border',
            getScoreColor(relevanceScore)
          )}>
            <Star className="w-4 h-4 fill-current" />
            <span>{relevanceScore}% Match</span>
          </div>
        </div>
        
        {matchFactors.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <span>Hide details</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Why this matches</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      <p className="mt-3 text-sm text-foreground">{reasoning}</p>

      {isExpanded && matchFactors.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Match Factors
          </p>
          <ul className="space-y-2">
            {matchFactors.map((factor, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <Star className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
