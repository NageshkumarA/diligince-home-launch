
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, XCircle, UserCheck } from 'lucide-react';

type StakeholderStatus = 'invited' | 'pre-qualified' | 'approved' | 'active' | 'suspended' | 'rejected';

interface StakeholderStatusBadgeProps {
  status: StakeholderStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StakeholderStatusBadge = ({ 
  status, 
  size = 'md', 
  showIcon = true 
}: StakeholderStatusBadgeProps) => {
  const getStatusConfig = (status: StakeholderStatus) => {
    switch (status) {
      case 'invited':
        return {
          label: 'Invited',
          className: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <Clock className="h-3 w-3" />
        };
      case 'pre-qualified':
        return {
          label: 'Pre-qualified',
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <AlertCircle className="h-3 w-3" />
        };
      case 'approved':
        return {
          label: 'Approved',
          className: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="h-3 w-3" />
        };
      case 'active':
        return {
          label: 'Active',
          className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: <UserCheck className="h-3 w-3" />
        };
      case 'suspended':
        return {
          label: 'Suspended',
          className: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: <AlertCircle className="h-3 w-3" />
        };
      case 'rejected':
        return {
          label: 'Rejected',
          className: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle className="h-3 w-3" />
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Clock className="h-3 w-3" />
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <Badge 
      variant="outline" 
      className={`${config.className} ${sizeClasses[size]} flex items-center gap-1.5 font-medium`}
    >
      {showIcon && config.icon}
      {config.label}
    </Badge>
  );
};
