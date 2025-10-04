
import React, { useState, useEffect, Suspense, memo } from "react";
import { LogisticsVendorHeader } from "@/components/vendor/LogisticsVendorHeader";
import { FastLoadingState } from "@/components/shared/loading/FastLoadingState";
import { SkeletonLoader } from "@/components/shared/loading/SkeletonLoader";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { perfUtils } from "@/utils/performance";

// Lazy load dashboard components for better performance
const DashboardStats = React.lazy(() => 
  import("@/components/vendor/logistics/dashboard/DashboardStats").then(module => ({
    default: module.DashboardStats
  }))
);

const TransportRequests = React.lazy(() => 
  import("@/components/vendor/logistics/dashboard/TransportRequests").then(module => ({
    default: module.TransportRequests
  }))
);

const ActiveDeliveries = React.lazy(() => 
  import("@/components/vendor/logistics/dashboard/ActiveDeliveries").then(module => ({
    default: module.ActiveDeliveries
  }))
);

const EquipmentFleet = React.lazy(() => 
  import("@/components/vendor/logistics/dashboard/EquipmentFleet").then(module => ({
    default: module.EquipmentFleet
  }))
);

const MessagesHub = React.lazy(() => 
  import("@/components/vendor/logistics/dashboard/MessagesHub").then(module => ({
    default: module.MessagesHub
  }))
);

// Memoized dashboard container
const DashboardContainer = memo(() => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your logistics operations.</p>
      </div>

      {/* Stats Cards - Load first for immediate feedback */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-100">
              <SkeletonLoader lines={2} height="20px" />
            </div>
          ))}
        </div>
      }>
        <DashboardStats />
      </Suspense>

      {/* Main Content Grid - Progressive loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <SkeletonLoader lines={6} />
          </div>
        }>
          <TransportRequests />
        </Suspense>
        
        <Suspense fallback={
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <SkeletonLoader lines={6} />
          </div>
        }>
          <ActiveDeliveries />
        </Suspense>
      </div>

      {/* Secondary Content - Load after main content */}
      <Suspense fallback={
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <SkeletonLoader lines={8} />
        </div>
      }>
        <EquipmentFleet />
      </Suspense>

      <Suspense fallback={
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <SkeletonLoader lines={5} />
        </div>
      }>
        <MessagesHub />
      </Suspense>
    </div>
  );
});

DashboardContainer.displayName = "DashboardContainer";

const LogisticsVendorDashboard = () => {
  console.log("LogisticsVendorDashboard rendering - optimized version");
  usePerformanceMonitor("LogisticsVendorDashboard");
  const [loading, setLoading] = useState(true);

  // Initialize performance monitoring
  useEffect(() => {
    perfUtils.measureCoreWebVitals();
  }, []);

  useEffect(() => {
    // Optimized data loading - reduced from 1300ms to 400ms
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <LogisticsVendorHeader /> */}
        
        <main className="pt-32 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6 mt-8">
            <FastLoadingState message="Loading your logistics dashboard..." size="lg" />
            
            {/* Loading skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-100">
                  <SkeletonLoader lines={2} height="20px" />
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <SkeletonLoader lines={6} />
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-100">
                <SkeletonLoader lines={6} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <SkeletonLoader lines={5} />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <LogisticsVendorHeader /> */}
      
      <main className="pt-32 p-6 lg:p-8">
        <DashboardContainer />
      </main>
    </div>
  );
};

export default memo(LogisticsVendorDashboard);
