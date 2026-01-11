import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddOn, getIconComponent } from '@/data/pricingData';
import { cn } from '@/lib/utils';

interface AddOnCardProps {
  addon: AddOn;
  index?: number;
}

export const AddOnCard: React.FC<AddOnCardProps> = ({ addon, index = 0 }) => {
  const Icon = getIconComponent(addon.icon);
  const isSubscription = addon.type === 'subscription';
  const isAIRelated = addon.name.toLowerCase().includes('ai') || addon.name.toLowerCase().includes('bot');

  return (
    <Card 
      className={cn(
        "group h-full transition-all duration-500 bg-white/70 backdrop-blur-sm",
        "border border-[hsl(210,64%,23%,0.1)]",
        "hover:-translate-y-1 hover:shadow-xl hover:border-[hsl(210,64%,23%,0.3)]",
        "hover:bg-white/90"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* AI glow for AI-related add-ons */}
      {isAIRelated && (
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,64%,23%,0.05)] to-transparent rounded-xl" />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "relative p-2.5 rounded-xl transition-all duration-300",
              "bg-gradient-to-br from-[hsl(210,64%,23%,0.1)] to-[hsl(210,64%,23%,0.05)]",
              "group-hover:from-[hsl(210,64%,23%,0.15)] group-hover:to-[hsl(210,64%,23%,0.08)]",
              "group-hover:shadow-md"
            )}>
              {isAIRelated && (
                <div className="absolute -inset-0.5 rounded-xl bg-[hsl(210,64%,23%)] opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-300" />
              )}
              <Icon className={cn(
                "h-5 w-5 text-[hsl(210,64%,23%)] relative transition-transform duration-300",
                "group-hover:scale-110"
              )} />
            </div>
            <div>
              <h4 className="font-semibold text-foreground flex items-center gap-1.5 group-hover:text-[hsl(210,64%,23%)] transition-colors duration-300">
                {addon.name}
                {isAIRelated && (
                  <Sparkles className="h-3 w-3 text-[hsl(210,64%,23%)] opacity-50 group-hover:opacity-100 group-hover:animate-sparkle transition-opacity duration-300" />
                )}
              </h4>
              <p className="text-sm text-muted-foreground">{addon.shortDescription}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-foreground">
            ₹{addon.price.toLocaleString('en-IN')}
          </span>
          {isSubscription ? (
            <span className="text-sm text-muted-foreground">/month</span>
          ) : (
            <Badge variant="outline" className="text-xs border-[hsl(210,64%,23%,0.3)] text-[hsl(210,64%,23%)]">
              One-time
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <ul className="space-y-2">
          {addon.featureList.map((feature, idx) => (
            <li 
              key={idx} 
              className="flex items-start gap-2 group/item"
            >
              <Check className="h-3.5 w-3.5 text-[hsl(210,64%,23%)] flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover/item:scale-110" />
              <span className="text-xs text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
