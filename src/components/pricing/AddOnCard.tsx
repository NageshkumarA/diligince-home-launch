import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddOn, getIconComponent } from '@/data/pricingData';

interface AddOnCardProps {
  addon: AddOn;
}

export const AddOnCard: React.FC<AddOnCardProps> = ({ addon }) => {
  const Icon = getIconComponent(addon.icon);
  const isSubscription = addon.type === 'subscription';

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-[hsl(210,64%,23%)]/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(210,64%,23%)]/10">
              <Icon className="h-5 w-5 text-[hsl(210,64%,23%)]" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{addon.name}</h4>
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
            <Badge variant="outline" className="text-xs">One-time</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <ul className="space-y-2">
          {addon.featureList.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-3.5 w-3.5 text-[hsl(210,64%,23%)] flex-shrink-0 mt-0.5" />
              <span className="text-xs text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
