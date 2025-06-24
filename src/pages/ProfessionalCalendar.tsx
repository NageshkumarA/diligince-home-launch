import React, { useState } from "react";
import { Home, Briefcase, Calendar, MessageSquare, User, Download, Settings, Grid, List, ChevronLeft, ChevronRight, Filter, Bell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import EnhancedAvailabilityCalendar from "@/components/professional/calendar/EnhancedAvailabilityCalendar";
import WeekView from "@/components/professional/calendar/WeekView";
import DayView from "@/components/professional/calendar/DayView";
import FilterModal from "@/components/professional/calendar/FilterModal";
import BulkAvailabilityModal from "@/components/professional/calendar/BulkAvailabilityModal";
import CalendarTemplatesModal from "@/components/professional/calendar/CalendarTemplatesModal";
import CalendarSyncModal from "@/components/professional/calendar/CalendarSyncModal";
import { useModal } from "@/hooks/useModal";

const ProfessionalCalendar = () => {
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  
  // Modal controls using the useModal hook
  const filterModal = useModal();
  const bulkModal = useModal();
  const templatesModal = useModal();
  const syncModal = useModal();

  // Header navigation items
  const headerNavItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/professional-dashboard" },
    { label: "Opportunities", icon: <Briefcase size={18} />, href: "/professional-opportunities" },
    { label: "Calendar", icon: <Calendar size={18} />, href: "/professional-calendar", active: true },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "/professional-messages" },
    { label: "Profile", icon: <User size={18} />, href: "/professional-profile" },
  ];

  const handleExportCalendar = () => {
    toast.success("Exporting calendar to Google Calendar, Outlook, and iCal formats");
  };

  const handleImportCalendar = () => {
    toast.success("Opening calendar import wizard");
  };

  const handleViewChange = (view: 'month' | 'week' | 'day') => {
    setCalendarView(view);
    toast.success(`Switched to ${view} view`);
  };

  const handleNotificationSettings = () => {
    toast.success("Opening notification settings");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProfessionalHeader navItems={headerNavItems} />
      
      {/* Fixed main content with proper padding to avoid navbar overlap */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-8 flex-1">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-purple-600 font-medium">Calendar</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Professional Calendar</h1>
                <p className="text-gray-600">Manage your availability, schedule meetings, and track your professional commitments.</p>
              </div>
              
              {/* Enhanced Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={filterModal.openModal}
                  className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={templatesModal.openModal}
                  className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Grid className="h-4 w-4" />
                  Templates
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={bulkModal.openModal}
                  className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Clock className="h-4 w-4" />
                  Bulk Set
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImportCalendar}
                  className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Download className="h-4 w-4" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={syncModal.openModal}
                  className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Settings className="h-4 w-4" />
                  Sync
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportCalendar}
                  className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNotificationSettings}
                  className="flex items-center gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                  <Bell className="h-4 w-4" />
                  Alerts
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Calendar Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card className="p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available Days</p>
                  <p className="text-xl font-semibold text-gray-900">18</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Busy Days</p>
                  <p className="text-xl font-semibold text-gray-900">8</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Unavailable</p>
                  <p className="text-xl font-semibold text-gray-900">4</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Meetings</p>
                  <p className="text-xl font-semibold text-gray-900">12</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hours Booked</p>
                  <p className="text-xl font-semibold text-gray-900">156</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Calendar View Tabs */}
          <div className="mb-8">
            <Tabs value={calendarView} onValueChange={(value) => handleViewChange(value as 'month' | 'week' | 'day')} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="grid w-fit grid-cols-3">
                  <TabsTrigger value="month" className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    Month
                  </TabsTrigger>
                  <TabsTrigger value="week" className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Week
                  </TabsTrigger>
                  <TabsTrigger value="day" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Day
                  </TabsTrigger>
                </TabsList>

                {/* Quick Navigation */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    Today
                  </Button>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="month" className="mt-0">
                <EnhancedAvailabilityCalendar />
              </TabsContent>

              <TabsContent value="week" className="mt-0">
                <WeekView />
              </TabsContent>

              <TabsContent value="day" className="mt-0">
                <DayView />
              </TabsContent>
            </Tabs>
          </div>

          {/* Calendar Analytics Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Weekly Availability</span>
                  <span className="text-sm font-medium text-green-600">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Booking Rate</span>
                  <span className="text-sm font-medium text-blue-600">62%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Rate</span>
                  <span className="text-sm font-medium text-purple-600">$85/hour</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Client Meeting</p>
                    <p className="text-xs text-gray-500">Tomorrow at 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Project Review</p>
                    <p className="text-xs text-gray-500">Friday at 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Team Standup</p>
                    <p className="text-xs text-gray-500">Monday at 9:00 AM</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50" onClick={bulkModal.openModal}>
                  <Grid className="h-4 w-4 mr-2" />
                  Set Weekly Pattern
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50" onClick={syncModal.openModal}>
                  <Settings className="h-4 w-4 mr-2" />
                  Sync Calendar
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50" onClick={handleExportCalendar}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Schedule
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* All Modals */}
      <FilterModal isOpen={filterModal.isOpen} onClose={filterModal.closeModal} />
      <BulkAvailabilityModal isOpen={bulkModal.isOpen} onClose={bulkModal.closeModal} />
      <CalendarTemplatesModal isOpen={templatesModal.isOpen} onClose={templatesModal.closeModal} />
      <CalendarSyncModal isOpen={syncModal.isOpen} onClose={syncModal.closeModal} />
    </div>
  );
};

export default ProfessionalCalendar;
