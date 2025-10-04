import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'purple';
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend
}) => {
  const colorClasses = {
    blue: 'text-[#2F80ED] bg-[#2F80ED]/10',
    green: 'text-[#27AE60] bg-[#27AE60]/10',
    orange: 'text-[#F2994A] bg-[#F2994A]/10',
    purple: 'text-purple-600 bg-purple-100'
  };



  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-4 hover:shadow-md transition-shadow hover:cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-[#1a365d] text-sm font-medium mb-1">{title}</p>
          <p className="text-xl font-bold text-[#333333] mb-2">{value}</p>
          {/* {trend && (
            <div className="flex items-center space-x-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-[#27AE60]' : 'text-red-500'
                }`}
              >
                {trend.isPositive ? '+' : ''}{trend.value}
              </span>
              <span className="text-[#828282] text-sm">vs last month</span>
            </div>
          )} */}
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;