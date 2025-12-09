import React from 'react';
import { FileText, BarChart3, Package, HelpCircle, Users } from 'lucide-react';
import { SuggestedAction } from './types';

const SUGGESTED_ACTIONS: SuggestedAction[] = [
  {
    id: 'create-requirement',
    label: 'Create a Requirement',
    message: 'How do I create a new procurement requirement?',
  },
  {
    id: 'approval-workflow',
    label: 'Approval Workflow',
    message: 'How does the approval workflow work?',
  },
  {
    id: 'compare-quotations',
    label: 'Compare Quotations',
    message: 'How can I compare vendor quotations?',
  },
  {
    id: 'track-orders',
    label: 'Track Orders',
    message: 'How do I track my purchase orders?',
  },
];

const getIcon = (id: string) => {
  switch (id) {
    case 'create-requirement':
      return <FileText className="w-4 h-4" />;
    case 'approval-workflow':
      return <Users className="w-4 h-4" />;
    case 'compare-quotations':
      return <BarChart3 className="w-4 h-4" />;
    case 'track-orders':
      return <Package className="w-4 h-4" />;
    default:
      return <HelpCircle className="w-4 h-4" />;
  }
};

interface SuggestedActionsProps {
  onActionClick: (message: string) => void;
}

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({ onActionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-6 text-center">
      {/* Welcome Message */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/80 flex items-center justify-center mb-4 shadow-lg">
        <span className="text-2xl">🤖</span>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Hi! I'm Diligince AI
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-[280px]">
        Your intelligent procurement assistant. How can I help you today?
      </p>
      
      {/* Quick Actions Grid */}
      <div className="w-full grid grid-cols-2 gap-2">
        {SUGGESTED_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.message)}
            className="flex items-center gap-2 px-3 py-2.5 bg-muted/50 hover:bg-muted 
                       rounded-xl text-left text-sm transition-all duration-200 
                       hover:shadow-sm border border-transparent hover:border-border/50
                       group"
          >
            <span className="text-brand-primary group-hover:scale-110 transition-transform">
              {getIcon(action.id)}
            </span>
            <span className="text-foreground/80 group-hover:text-foreground text-xs font-medium">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
