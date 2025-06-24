
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TableLoadingStateProps {
  rows?: number;
  columns?: number;
}

export const TableLoadingState = ({ rows = 5, columns = 4 }: TableLoadingStateProps) => {
  return (
    <div className="space-y-3">
      {/* Table header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-6 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};
