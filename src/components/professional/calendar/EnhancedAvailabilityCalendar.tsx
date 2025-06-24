
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  DollarSign,
  FileText,
  Paperclip,
  Plus
} from "lucide-react";
import { DayDetailsModal } from "./DayDetailsModal";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";

export interface DayData {
  date: Date;
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    timeSlots: { start: string; end: string }[];
    recurring?: boolean;
  };
  pricing: {
    hourlyRate?: number;
    dayRate?: number;
    currency: string;
    notes?: string;
  };
  notes: {
    private: string;
    clientVisible: string;
    templates: string[];
  };
  documents: {
    files: File[];
    categories: string[];
    permissions: 'private' | 'client-visible';
  };
}

const EnhancedAvailabilityCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dayDataMap, setDayDataMap] = useState<Map<string, DayData>>(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for demonstration
  React.useEffect(() => {
    const sampleData = new Map<string, DayData>();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    sampleData.set(format(today, 'yyyy-MM-dd'), {
      date: today,
      availability: {
        status: 'available',
        timeSlots: [{ start: '09:00', end: '17:00' }],
      },
      pricing: {
        hourlyRate: 75,
        currency: 'USD',
        notes: 'Standard consulting rate'
      },
      notes: {
        private: 'Available for new projects',
        clientVisible: 'Open for consultations',
        templates: []
      },
      documents: {
        files: [],
        categories: [],
        permissions: 'private'
      }
    });

    sampleData.set(format(tomorrow, 'yyyy-MM-dd'), {
      date: tomorrow,
      availability: {
        status: 'busy',
        timeSlots: [{ start: '10:00', end: '14:00' }],
      },
      pricing: {
        hourlyRate: 100,
        currency: 'USD',
        notes: 'Premium project rate'
      },
      notes: {
        private: 'Client meeting scheduled',
        clientVisible: 'Partially available',
        templates: []
      },
      documents: {
        files: [],
        categories: ['project-docs'],
        permissions: 'client-visible'
      }
    });

    setDayDataMap(sampleData);
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleSaveDayData = (date: Date, data: DayData) => {
    const newMap = new Map(dayDataMap);
    newMap.set(format(date, 'yyyy-MM-dd'), data);
    setDayDataMap(newMap);
    setIsModalOpen(false);
  };

  const getDayData = (date: Date): DayData | undefined => {
    return dayDataMap.get(format(date, 'yyyy-MM-dd'));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 border-green-300';
      case 'busy': return 'bg-yellow-100 border-yellow-300';
      case 'unavailable': return 'bg-red-100 border-red-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const renderCalendarDay = (date: Date) => {
    const dayData = getDayData(date);
    const hasNotes = dayData?.notes.private || dayData?.notes.clientVisible;
    const hasPricing = dayData?.pricing.hourlyRate || dayData?.pricing.dayRate;
    const hasDocuments = dayData?.documents.files.length || 0 > 0;

    return (
      <div
        className={`
          relative p-2 min-h-[80px] border cursor-pointer transition-all hover:shadow-md bg-white
          ${dayData ? getStatusColor(dayData.availability.status) : 'bg-white border-gray-200'}
          ${isToday(date) ? 'ring-2 ring-purple-500' : ''}
        `}
        onClick={() => handleDateClick(date)}
      >
        <div className="text-sm font-medium text-gray-900">
          {format(date, 'd')}
        </div>
        
        {dayData && (
          <div className="mt-1 space-y-1">
            <div className="text-xs text-gray-600 capitalize">
              {dayData.availability.status}
            </div>
            
            <div className="flex gap-1">
              {hasPricing && (
                <DollarSign className="w-3 h-3 text-green-600" />
              )}
              {hasNotes && (
                <FileText className="w-3 h-3 text-blue-600" />
              )}
              {hasDocuments && (
                <Paperclip className="w-3 h-3 text-purple-600" />
              )}
            </div>
            
            {dayData.pricing.hourlyRate && (
              <div className="text-xs text-green-600 font-medium">
                ${dayData.pricing.hourlyRate}/hr
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad with days from previous/next month to fill the grid
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());
  
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
  
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-purple-600" />
          Professional Availability Calendar
        </h2>
        <p className="text-gray-600 mt-1">Manage your schedule, pricing, and availability.</p>
      </div>

      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 bg-white">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b bg-white">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 bg-white">
            {calendarDays.map((date, index) => (
              <div key={index}>
                {renderCalendarDay(date)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span>Busy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span>Has Pricing</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Has Notes</span>
        </div>
        <div className="flex items-center gap-2">
          <Paperclip className="w-4 h-4 text-purple-600" />
          <span>Has Documents</span>
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDate && (
        <DayDetailsModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          date={selectedDate}
          dayData={getDayData(selectedDate)}
          onSave={handleSaveDayData}
        />
      )}
    </div>
  );
};

export default EnhancedAvailabilityCalendar;
