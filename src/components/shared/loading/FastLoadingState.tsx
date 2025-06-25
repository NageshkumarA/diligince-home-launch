
import React, { memo } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface FastLoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showSpinner?: boolean;
}

// Optimized loading component with minimal re-renders
export const FastLoadingState = memo(({ 
  message = "Loading...", 
  size = "md",
  className = "",
  showSpinner = true
}: FastLoadingStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      {showSpinner && <LoadingSpinner size={size} />}
      <p className="mt-2 text-sm text-gray-600 animate-pulse">{message}</p>
    </div>
  );
});

FastLoadingState.displayName = "FastLoadingState";
