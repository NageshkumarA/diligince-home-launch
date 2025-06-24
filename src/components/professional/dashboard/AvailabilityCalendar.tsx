
import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export const AvailabilityCalendar = () => {
  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Availability Calendar</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">Today</span>
          </div>
          <span className="text-sm text-green-600">Available</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-yellow-800">Tomorrow</span>
          </div>
          <span className="text-sm text-yellow-600">Valve Inspection</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-800">May 12</span>
          </div>
          <span className="text-sm text-blue-600">System Audit</span>
        </div>
        
        <div className="pt-2">
          <button className="w-full text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
            View Full Calendar →
          </button>
        </div>
      </div>
    </Card>
  );
};
