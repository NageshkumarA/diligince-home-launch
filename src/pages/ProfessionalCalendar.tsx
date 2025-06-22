
import React, { useState } from "react";
import { Home, Briefcase, Calendar, MessageSquare, User, Download, Settings, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ProfessionalHeader from "@/components/professional/ProfessionalHeader";
import EnhancedAvailabilityCalendar from "@/components/professional/calendar/EnhancedAvailabilityCalendar";

const ProfessionalCalendar = () => {
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

  // Header navigation items
  const headerNavItems = [
    { label: "Dashboard", icon: <Home size={18} />, href: "/professional-dashboard" },
    { label: "Opportunities", icon: <Briefcase size={18} />, href: "/professional-opportunities" },
    { label: "Calendar", icon: <Calendar size={18} />, href: "/professional-calendar", active: true },
    { label: "Messages", icon: <MessageSquare size={18} />, href: "/professional-messages" },
    { label: "Profile", icon: <User size={18} />, href: "/professional-profile" },
  ];

  const handleExportCalendar = () => {
    toast.success("Calendar export functionality will be implemented");
  };

  const handleBulkAvailability = () => {
    toast.success("Bulk availability setting will be implemented");
  };

  const handleCalendarSync = () => {
    toast.success("Calendar sync settings will be implemented");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ProfessionalHeader navItems={headerNavItems} />
      
      <main className="pt-16 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Calendar</h1>
                <p className="text-gray-600">Manage your availability, schedule, and professional commitments.</p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkAvailability}
                  className="flex items-center gap-2"
                >
                  <Grid className="h-4 w-4" />
                  Bulk Set
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCalendarSync}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Sync Settings
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
              </div>
            </div>
          </div>

          {/* Calendar Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-xl font-semibold text-gray-900">30 Days</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Calendar - Remove padding since it's now full-page */}
          <div className="bg-white rounded-lg shadow-sm">
            <EnhancedAvailabilityCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalCalendar;
