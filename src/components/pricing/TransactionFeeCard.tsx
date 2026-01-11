import React from 'react';
import { Percent, Info, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const TransactionFeeCard: React.FC = () => {
  return (
    <Card className="group relative p-6 bg-white/70 backdrop-blur-sm border-[hsl(210,64%,23%,0.15)] max-w-2xl mx-auto overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-[hsl(210,64%,23%,0.25)]">
      {/* Animated gradient border */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(210,64%,23%,0.05)] via-transparent to-[hsl(210,64%,23%,0.05)]" />
      </div>
      
      <div className="relative flex items-start gap-4">
        <div className="relative p-3 rounded-xl bg-gradient-to-br from-[hsl(210,64%,23%)] to-[hsl(210,64%,28%)] text-white flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 rounded-xl bg-[hsl(210,64%,23%)] opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
          <Percent className="relative h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            Transaction Fee
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[hsl(210,64%,23%)] to-[hsl(210,64%,28%)] text-white text-lg font-bold shadow-sm">
              5%
              <Sparkles className="h-3 w-3 opacity-70" />
            </span>
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            For all successful transactions through our platform, we charge a 5% commission fee.
            This helps us maintain and improve our AI-powered services while ensuring fair value for all parties.
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground px-3 py-1.5 rounded-full bg-[hsl(210,64%,23%,0.05)] border border-[hsl(210,64%,23%,0.1)] w-fit">
            <Info className="h-3.5 w-3.5 text-[hsl(210,64%,23%)]" />
            <span>No transaction fees on subscription plans</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
