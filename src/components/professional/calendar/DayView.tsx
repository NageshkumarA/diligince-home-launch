
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { format, addDays, subDays, isToday } from "date-fns";

const DayView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    `${i.toString().padStart(2, '0')}:00`
  );

  const sampleEvents = [
    { time: '09:00', duration: 2, title: 'Client Consultation', description: 'Web development project discussion', price: '$150/hr' },
    { time: '14:00', duration: 1, title: 'Project Review', description: 'Quarterly project assessment', price: '$100/hr' },
    { time: '16:30', duration: 1.5, title: 'Team Meeting', description: 'Sprint planning session', price: '$125/hr' }
  ];

  const navigateDay = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'next' ? addDays(currentDate, 1) : subDays(currentDate, 1));
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateDay('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateDay('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((time, index) => {
            const event = sampleEvents.find(e => e.time === time);
            
            return (
              <div key={time} className="flex border-b">
                <div className="w-20 p-3 text-sm text-gray-500 border-r bg-gray-50">
                  {time}
                </div>
                <div className="flex-1 p-3 min-h-[80px] hover:bg-gray-50 cursor-pointer relative">
                  {event && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-blue-900">{event.title}</h4>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {event.price}
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-700 mb-1">{event.description}</p>
                      <div className="flex items-center gap-2 text-xs text-blue-600">
                        <Clock className="h-3 w-3" />
                        <span>{event.duration}h duration</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions for Day */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {sampleEvents.length} appointments scheduled
            </div>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DayView;
