import React from 'react';
import { cn } from '@/lib/utils';
import { userTypes, UserType } from '@/data/pricingData';

interface UserTypeSelectorProps {
  selectedType: UserType;
  onSelect: (type: UserType) => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  selectedType,
  onSelect
}) => {
  return (
    <div className="w-full">
      {/* Desktop: Horizontal tabs */}
      <div className="hidden md:flex justify-center gap-2 p-1.5 bg-muted/50 rounded-xl max-w-4xl mx-auto">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                isSelected
                  ? "bg-[hsl(210,64%,23%)] text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-background"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{type.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile: Scrollable pills */}
      <div className="md:hidden overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          {userTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => onSelect(type.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  isSelected
                    ? "bg-[hsl(210,64%,23%)] text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{type.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected type description */}
      {userTypes.map((type) => {
        if (type.id !== selectedType) return null;
        const Icon = type.icon;
        
        return (
          <div 
            key={type.id}
            className="mt-6 flex items-start gap-4 p-4 bg-muted/30 rounded-lg max-w-2xl mx-auto"
          >
            <div className="p-2.5 rounded-lg bg-[hsl(210,64%,23%)] text-white flex-shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{type.label}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{type.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
