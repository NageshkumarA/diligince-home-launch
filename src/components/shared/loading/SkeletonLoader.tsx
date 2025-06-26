
import React from 'react';

interface SkeletonLoaderProps {
  lines?: number;
  height?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  lines = 3, 
  height = "16px" 
}) => {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded"
          style={{ height }}
        />
      ))}
    </div>
  );
};
