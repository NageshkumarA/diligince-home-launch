import React from 'react';
import { Puzzle } from 'lucide-react';
import { AddOnCard } from './AddOnCard';
import { UserType, getAddOnsForUserType } from '@/data/pricingData';

interface AddOnSectionProps {
  userType: UserType;
}

export const AddOnSection: React.FC<AddOnSectionProps> = ({ userType }) => {
  const compatibleAddOns = getAddOnsForUserType(userType);

  if (compatibleAddOns.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Puzzle className="h-5 w-5 text-[hsl(210,64%,23%)]" />
          <h2 className="text-2xl font-bold text-foreground">Power-Up Add-ons</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enhance your plan with powerful add-ons tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {compatibleAddOns.map((addon) => (
          <AddOnCard key={addon.code} addon={addon} />
        ))}
      </div>
    </section>
  );
};
