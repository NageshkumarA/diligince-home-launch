import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";
import { BudgetOverview } from "@/types/industry-dashboard";

interface BudgetUtilizationProps {
  data: BudgetOverview;
}

const getProgressColor = (percentage: number) => {
  if (percentage < 70) return "bg-green-500";
  if (percentage < 90) return "bg-yellow-500";
  return "bg-red-500";
};

const getTextColor = (percentage: number) => {
  if (percentage < 70) return "text-green-600";
  if (percentage < 90) return "text-yellow-600";
  return "text-red-600";
};

export const BudgetUtilization: React.FC<BudgetUtilizationProps> = ({ data }) => {
  const categories = data?.categories ?? [];
  const totalAllocated = data?.totalAllocated ?? 0;
  const totalSpent = data?.totalSpent ?? 0;
  const overallPercentage = data?.overallPercentage ?? 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Overall Budget Card */}
      <Card className="lg:col-span-1 shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overall Budget</h3>
            {overallPercentage < 70 ? (
              <TrendingDown className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingUp className="h-5 w-5 text-yellow-600" />
            )}
          </div>
          
          <div className="mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl font-bold">
                ${(totalSpent / 1000000).toFixed(2)}M
              </span>
              <span className="text-sm text-muted-foreground">
                / ${(totalAllocated / 1000000).toFixed(2)}M
              </span>
            </div>
            <Progress 
              value={overallPercentage} 
              className="h-3"
            />
            <p className={`text-sm font-semibold mt-2 ${getTextColor(overallPercentage)}`}>
              {overallPercentage}% Utilized
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-semibold">
                ${((totalAllocated - totalSpent) / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Budget Status</span>
              <span className={`font-semibold ${getTextColor(overallPercentage)}`}>
                {overallPercentage < 70 ? "Healthy" : overallPercentage < 90 ? "Moderate" : "High"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Budget by Category</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((item) => (
              <div key={item.category} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">{item.category}</h4>
                  <span className={`text-sm font-bold ${getTextColor(item.percentage)}`}>
                    {item.percentage}%
                  </span>
                </div>
                
                <Progress 
                  value={item.percentage}
                  className="h-2 mb-2"
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Spent: <span className="font-semibold text-foreground">
                      ${(item.spent / 1000).toFixed(0)}K
                    </span>
                  </span>
                  <span>
                    Allocated: <span className="font-semibold text-foreground">
                      ${(item.allocated / 1000).toFixed(0)}K
                    </span>
                  </span>
                </div>
                
                <div className="mt-2 text-xs">
                  <span className="text-muted-foreground">Remaining: </span>
                  <span className={`font-semibold ${getTextColor(item.percentage)}`}>
                    ${((item.allocated - item.spent) / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
