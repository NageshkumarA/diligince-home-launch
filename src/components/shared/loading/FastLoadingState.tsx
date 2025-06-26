
import React from 'react';

interface FastLoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FastLoadingState: React.FC<FastLoadingStateProps> = ({ 
  message = "Loading...",
  size = "md"
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className={`animate-spin rounded-full border-b-2 border-blue-600 mx-auto mb-4 ${sizeClasses[size]}`}></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};
