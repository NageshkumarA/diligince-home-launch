import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ProcurementAnalytics as ProcurementAnalyticsType } from "@/types/industry-dashboard";

interface ProcurementAnalyticsProps {
  data: ProcurementAnalyticsType;
}

export const ProcurementAnalytics: React.FC<ProcurementAnalyticsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Spend by Category */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Spend by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.categories}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis 
                className="text-xs"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          {/* Category Summary */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {data.categories.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm font-medium">{cat.name}</span>
                </div>
                <span className="text-sm font-semibold">{cat.percentage}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Spend Trend */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Monthly Spend Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis 
                className="text-xs"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Spend"]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="spend" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Summary Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Total Spend</p>
              <p className="text-lg font-bold text-blue-600">
                ${(data.totalSpend / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Avg Monthly</p>
              <p className="text-lg font-bold text-green-600">
                ${(data.monthlyTrend.reduce((sum, m) => sum + m.spend, 0) / data.monthlyTrend.length / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Peak Month</p>
              <p className="text-lg font-bold text-purple-600">
                ${Math.max(...data.monthlyTrend.map(m => m.spend)) / 1000}K
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
