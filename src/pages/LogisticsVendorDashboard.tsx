
import React, { useState, useEffect } from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { DashboardStats } from "@/components/vendor/logistics/dashboard/DashboardStats";
import { TransportRequests } from "@/components/vendor/logistics/dashboard/TransportRequests";
import { ActiveDeliveries } from "@/components/vendor/logistics/dashboard/ActiveDeliveries";
import { EquipmentFleet } from "@/components/vendor/logistics/dashboard/EquipmentFleet";
import { MessagesHub } from "@/components/vendor/logistics/dashboard/MessagesHub";
import { LoadingState } from "@/components/shared/loading/LoadingState";
import { LoadingCard } from "@/components/shared/loading/LoadingCard";

const LogisticsVendorDashboard = () => {
  console.log("LogisticsVendorDashboard rendering");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LogisticsVendorHeader />
        
        <main className="pt-32 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6 mt-8">
            <LoadingState message="Loading your logistics dashboard..." size="lg" />
            
            {/* Loading skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <LoadingCard key={i} showHeader={false} lines={2} />
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LoadingCard />
              <LoadingCard />
            </div>
            
            <LoadingCard lines={5} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <LogisticsVendorHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your logistics operations.</p>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transport Requests */}
            <TransportRequests />
            
            {/* Active Deliveries */}
            <ActiveDeliveries />
          </div>

          {/* Equipment Fleet */}
          <EquipmentFleet />

          {/* Messages Hub */}
          <MessagesHub />
        </div>
      </main>
    </div>
  );
};

export default LogisticsVendorDashboard;
