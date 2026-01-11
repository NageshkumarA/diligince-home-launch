import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Plan } from '@/data/pricingData';

interface PlanCardProps {
  plan: Plan;
  onAction: (action: 'signup' | 'subscribe' | 'contact') => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onAction }) => {
  const formatPrice = () => {
    if (plan.isCustomPricing) {
      return 'Custom';
    }
    if (plan.priceRange) {
      return `₹${plan.priceRange.min.toLocaleString('en-IN')} - ₹${plan.priceRange.max.toLocaleString('en-IN')}`;
    }
    if (plan.price === 0) {
      return 'Free';
    }
    return `₹${plan.price?.toLocaleString('en-IN')}`;
  };

  const isPopular = plan.isPopular;
  const isFree = plan.price === 0;
  const isEnterprise = plan.tier === 'enterprise';

  return (
    <Card 
      className={cn(
        "relative flex flex-col h-full transition-all duration-300 hover:shadow-lg",
        isPopular 
          ? "border-2 border-[hsl(210,64%,23%)] shadow-lg" 
          : "border hover:border-[hsl(210,64%,23%)]/50"
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-[hsl(210,64%,23%)] hover:bg-[hsl(210,64%,28%)] text-white px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className={cn("text-center pb-4", isPopular && "pt-6")}>
        <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
        <div className="mt-4">
          <span className={cn(
            "font-bold text-foreground",
            plan.priceRange ? "text-2xl" : "text-3xl"
          )}>
            {formatPrice()}
          </span>
          {!plan.isCustomPricing && !isFree && !plan.priceRange && (
            <span className="text-muted-foreground ml-1">/month</span>
          )}
          {plan.priceRange && (
            <span className="text-muted-foreground ml-1">/month</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{plan.shortDescription}</p>
      </CardHeader>

      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {plan.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-[hsl(210,64%,23%)] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          onClick={() => onAction(plan.ctaAction)}
          className={cn(
            "w-full font-medium",
            isPopular || isEnterprise
              ? "bg-[hsl(210,64%,23%)] hover:bg-[hsl(210,64%,18%)] text-white"
              : isFree
                ? "bg-background border-2 border-[hsl(210,64%,23%)] text-[hsl(210,64%,23%)] hover:bg-[hsl(210,64%,23%)] hover:text-white"
                : "bg-[hsl(210,64%,23%)] hover:bg-[hsl(210,64%,18%)] text-white"
          )}
        >
          {plan.ctaLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};
