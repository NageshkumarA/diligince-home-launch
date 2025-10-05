import React from 'react';

interface StatusBadgeProps {
  status: string;
  color?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, color }) => {
  const getStatusColor = (status: string, customColor?: string) => {
    if (customColor) return customColor;
    
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('awaiting') || statusLower.includes('pending')) return 'bg-corporate-navy-100 text-corporate-navy-700';
    if (statusLower.includes('todo')) return 'bg-purple-100 text-purple-800';
    if (statusLower.includes('condemn')) return 'bg-corporate-success-100 text-corporate-success-700';
    if (statusLower.includes('inspection')) return 'bg-corporate-warning-100 text-corporate-warning-700';
    if (statusLower.includes('request')) return 'bg-corporate-warning-100 text-corporate-warning-700';
    if (statusLower.includes('completed')) return 'bg-corporate-success-100 text-corporate-success-700';
    if (statusLower.includes('failed')) return 'bg-corporate-danger-100 text-corporate-danger-700';
    
    return 'bg-corporate-gray-100 text-corporate-gray-700';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status, color)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;