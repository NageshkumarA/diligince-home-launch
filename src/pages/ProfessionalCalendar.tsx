
import React, { useState } from "react";
import { Home, Briefcase, Calendar, MessageSquare, User, Download, Settings, Grid, List, ChevronLeft, ChevronRight, Filter, Bell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import EnhancedAvailabilityCalendar from "@/components/professional/calendar/EnhancedAvailabilityCalendar";

const ProfessionalCalendar = () => {
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const [showFilters, setShowFilters] = useState(false);

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

  const handleBulkAvailability = () => {
    toast.success("Opening bulk availability settings for multiple days");
  };

  const handleCalendarSync = () => {
    toast.success("Opening calendar sync settings with external calendars");
  };

  const handleViewChange = (view: 'month' | 'week' | 'day') => {
    setCalendarView(view);
    toast.success(`Switched to ${view} view`);
  };

  const handleImportCalendar = () => {
    toast.success("Calendar import functionality will be implemented");
  };

  const handleCalendarTemplates = () => {
    toast.success("Calendar templates functionality will be implemented");
  };

  const handleNotificationSettings = () => {
    toast.success("Notification settings will be implemented");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProfessionalHeader navItems={headerNavItems} />
      
      <main className="pt-16 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Page Header */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-purple-600 font-medium">Calendar</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Calendar</h1>
                <p className="text-gray-600">Manage your availability, schedule meetings, and track your professional commitments.</p>
              </div>
              
              {/* Enhanced Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCalendarTemplates}
                  className="flex items-center gap-2"
                >
                  <Grid className="h-4 w-4" />
                  Templates
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkAvailability}
                  className="flex items-center gap-2"
                >
                  <Clock className="h-4 w-4" />
                  Bulk Set
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImportCalendar}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCalendarSync}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Sync
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportCalendar}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNotificationSettings}
                  className="flex items-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  Alerts
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Calendar Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="p-4">
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
            
            <Card className="p-4">
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
            
            <Card className="p-4">
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
            
            <Card className="p-4">
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

            <Card className="p-4">
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
          <div className="mb-6">
            <Tabs value={calendarView} onValueChange={(value) => handleViewChange(value as 'month' | 'week' | 'day')} className="w-full">
              <div className="flex items-center justify-between mb-4">
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
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="month" className="mt-0">
                <div className="bg-white rounded-lg shadow-sm border">
                  <EnhancedAvailabilityCalendar />
                </div>
              </TabsContent>

              <TabsContent value="week" className="mt-0">
                <Card className="p-6">
                  <div className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Week View</h3>
                    <p className="text-gray-600 mb-4">Enhanced week view with time slots and detailed scheduling</p>
                    <Button onClick={() => toast.success("Week view will be implemented")}>
                      Coming Soon
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="day" className="mt-0">
                <Card className="p-6">
                  <div className="text-center py-12">
                    <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Day View</h3>
                    <p className="text-gray-600 mb-4">Detailed day view with hourly time slots and meeting management</p>
                    <Button onClick={() => toast.success("Day view will be implemented")}>
                      Coming Soon
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Optional Filters Panel */}
          {showFilters && (
            <Card className="mb-6 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Calendar Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <span className="sr-only">Close filters</span>
                  ×
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>All Statuses</option>
                    <option>Available</option>
                    <option>Busy</option>
                    <option>Unavailable</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Price Range</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>All Ranges</option>
                    <option>$50-100/hr</option>
                    <option>$100-150/hr</option>
                    <option>$150+/hr</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Project Type</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>All Projects</option>
                    <option>Consulting</option>
                    <option>Development</option>
                    <option>Meetings</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </Card>
          )}

          {/* Calendar Analytics Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
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

            <Card className="p-6">
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

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleBulkAvailability}>
                  <Grid className="h-4 w-4 mr-2" />
                  Set Weekly Pattern
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleCalendarSync}>
                  <Settings className="h-4 w-4 mr-2" />
                  Sync Calendar
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleExportCalendar}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Schedule
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalCalendar;
