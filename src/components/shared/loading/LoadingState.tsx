
import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingState = ({ 
  message = "Loading...", 
  size = "md",
  className = ""
}: LoadingStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <LoadingSpinner size={size} />
      <p className="mt-3 text-sm text-gray-600">{message}</p>
    </div>
  );
};
