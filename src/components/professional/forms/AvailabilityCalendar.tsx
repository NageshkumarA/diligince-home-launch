
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

const AvailabilityCalendar = () => {
  const availability = [
    { day: "Monday", status: "Available", hours: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", status: "Available", hours: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", status: "Busy", hours: "Project Work" },
    { day: "Thursday", status: "Available", hours: "9:00 AM - 6:00 PM" },
    { day: "Friday", status: "Available", hours: "9:00 AM - 6:00 PM" }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Availability Calendar</h2>
        <p className="text-gray-600 mt-1">Manage your work schedule and availability.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          {availability.map((day, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    day.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="font-medium text-gray-900">{day.day}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} />
                  {day.hours}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Save Changes
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
