
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, addDays, addWeeks, subWeeks, isToday } from "date-fns";

const WeekView = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const weekStart = startOfWeek(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const timeSlots = Array.from({ length: 24 }, (_, i) => 
    `${i.toString().padStart(2, '0')}:00`
  );

  const sampleEvents = [
    { day: 1, time: '09:00', duration: 2, title: 'Client Meeting', type: 'meeting' },
    { day: 3, time: '14:00', duration: 1, title: 'Project Review', type: 'review' },
    { day: 5, time: '10:00', duration: 3, title: 'Development Work', type: 'work' }
  ];

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(direction === 'next' ? addWeeks(currentWeek, 1) : subWeeks(currentWeek, 1));
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Week of {format(weekStart, 'MMM d, yyyy')}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentWeek(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex border-b">
          <div className="w-16 p-2 border-r bg-gray-50"></div>
          {weekDays.map((day, index) => (
            <div key={index} className="flex-1 p-2 text-center border-r last:border-r-0">
              <div className={`text-sm font-medium ${isToday(day) ? 'text-blue-600' : 'text-gray-900'}`}>
                {format(day, 'EEE')}
              </div>
              <div className={`text-lg ${isToday(day) ? 'text-blue-600 font-bold' : 'text-gray-600'}`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {timeSlots.slice(8, 20).map((time, timeIndex) => (
            <div key={time} className="flex border-b">
              <div className="w-16 p-2 text-xs text-gray-500 border-r bg-gray-50">
                {time}
              </div>
              {weekDays.map((_, dayIndex) => {
                const event = sampleEvents.find(e => 
                  e.day === dayIndex && e.time === time
                );
                
                return (
                  <div key={dayIndex} className="flex-1 p-1 border-r last:border-r-0 min-h-[60px] relative hover:bg-gray-50 cursor-pointer">
                    {event && (
                      <div className={`
                        absolute inset-1 rounded p-1 text-xs
                        ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                          event.type === 'review' ? 'bg-green-100 text-green-800' : 
                          'bg-purple-100 text-purple-800'}
                      `}>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs opacity-75">{event.duration}h</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekView;
