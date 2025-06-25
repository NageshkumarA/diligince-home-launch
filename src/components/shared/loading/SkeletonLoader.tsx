
import React, { memo } from "react";

interface SkeletonLoaderProps {
  lines?: number;
  width?: string;
  height?: string;
  className?: string;
}

// Optimized skeleton loader for progressive loading
export const SkeletonLoader = memo(({ 
  lines = 3, 
  width = "100%", 
  height = "16px",
  className = ""
}: SkeletonLoaderProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 rounded animate-pulse"
          style={{
            width: i === lines - 1 ? '60%' : width,
            height
          }}
        />
      ))}
    </div>
  );
});

SkeletonLoader.displayName = "SkeletonLoader";
