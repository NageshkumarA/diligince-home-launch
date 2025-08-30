import React from 'react';

interface StatusBadgeProps {
  status: string;
  color?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, color }) => {
  const getStatusColor = (status: string, customColor?: string) => {
    if (customColor) return customColor;
    
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('awaiting') || statusLower.includes('pending')) return 'bg-primary/10 text-primary';
    if (statusLower.includes('todo')) return 'bg-purple-100 text-purple-800';
    if (statusLower.includes('condemn')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('inspection')) return 'bg-orange-100 text-orange-800';
    if (statusLower.includes('request')) return 'bg-yellow-100 text-yellow-800';
    if (statusLower.includes('completed')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('failed')) return 'bg-red-100 text-red-800';
    
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status, color)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;