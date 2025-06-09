
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockCalendarData = {
  month: "May 2025",
  year: 2025,
  days: [
    { date: 5, status: "available" },
    { date: 6, status: "available" },
    { date: 7, status: "confirmed-job" },
    { date: 8, status: "confirmed-job" },
    { date: 9, status: "reserved" },
    { date: 10, status: "available" },
    { date: 11, status: "available" },
    { date: 12, status: "reserved" },
    { date: 13, status: "reserved" },
    { date: 14, status: "available" },
    { date: 15, status: "available" },
    { date: 16, status: "confirmed-job" },
    { date: 17, status: "available" },
    { date: 18, status: "available" },
    { date: 19, status: "available" },
    { date: 20, status: "available" },
    { date: 21, status: "available" }
  ]
};

export const AvailabilityCalendar = () => {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [currentMonth, setCurrentMonth] = useState("May 2025");

  const getDayStatus = (date: number) => {
    const day = mockCalendarData.days.find(d => d.date === date);
    return day?.status || "available";
  };

  const getDayColor = (status: string) => {
    switch (status) {
      case "confirmed-job":
        return "bg-green-100 text-green-800 border-green-300";
      case "reserved":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-white text-gray-800 border-gray-200 hover:bg-gray-50";
    }
  };

  const handleDayClick = (date: number) => {
    setSelectedDays(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = 31; // May has 31 days
    const startDay = 3; // May 1st, 2025 is a Thursday (3rd day of week, 0-based)

    // Add empty cells for days before the 1st
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Add days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const status = getDayStatus(date);
      const isSelected = selectedDays.includes(date);
      
      days.push(
        <button
          key={date}
          onClick={() => handleDayClick(date)}
          className={`
            p-2 text-sm rounded-lg border-2 transition-all duration-200
            ${getDayColor(status)}
            ${isSelected ? "ring-2 ring-purple-400" : ""}
            hover:scale-105
          `}
        >
          {date}
        </button>
      );
    }

    return days;
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Availability Calendar</CardTitle>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
        
        {/* Month Navigation */}
        <div className="flex items-center justify-between mt-4">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold text-gray-900">{currentMonth}</h3>
          <Button variant="ghost" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Week Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="p-2 text-xs font-medium text-gray-500 text-center">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {renderCalendarDays()}
        </div>
        
        {/* Legend */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Legend:</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="outline" className="bg-white border-gray-200">
              Available
            </Badge>
            <Badge variant="outline" className="bg-purple-100 border-purple-300 text-purple-800">
              Reserved
            </Badge>
            <Badge variant="outline" className="bg-green-100 border-green-300 text-green-800">
              Confirmed Job
            </Badge>
          </div>
        </div>
        
        {/* Update Button */}
        <Button className="w-full mt-4 bg-[#722ed1] hover:bg-[#722ed1]/90">
          Update Availability
        </Button>
      </CardContent>
    </Card>
  );
};
