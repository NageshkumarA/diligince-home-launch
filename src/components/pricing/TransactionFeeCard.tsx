import React from 'react';
import { Percent, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const TransactionFeeCard: React.FC = () => {
  return (
    <Card className="p-6 bg-[hsl(210,64%,23%)]/5 border-[hsl(210,64%,23%)]/20 max-w-2xl mx-auto">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-[hsl(210,64%,23%)] text-white flex-shrink-0">
          <Percent className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            Transaction Fee
            <span className="text-lg font-bold text-[hsl(210,64%,23%)]">5%</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            For all successful transactions through our platform, we charge a 5% commission fee.
            This helps us maintain and improve our services while ensuring fair value for all parties.
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5" />
            <span>No transaction fees on subscription plans</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
