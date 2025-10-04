import React, { Suspense, memo } from "react";
import { ProductVendorHeader } from "@/components/vendor/ProductVendorHeader";
import { FastLoadingState } from "@/components/shared/loading/FastLoadingState";
import { SkeletonLoader } from "@/components/shared/loading/SkeletonLoader";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { perfUtils } from "@/utils/performance";

// Lazy load dashboard components for better performance
const DashboardStats = React.lazy(() => 
  import("@/components/vendor/product/dashboard/DashboardStats").then(module => ({
    default: module.DashboardStats
  }))
);

const ProductCatalogView = React.lazy(() => 
  import("@/components/vendor/product/dashboard/ProductCatalogView").then(module => ({
    default: module.ProductCatalogView
  }))
);

const RFQManagement = React.lazy(() => 
  import("@/components/vendor/product/dashboard/RFQManagement").then(module => ({
    default: module.RFQManagement
  }))
);

const OrdersManagement = React.lazy(() => 
  import("@/components/vendor/product/dashboard/OrdersManagement").then(module => ({
    default: module.OrdersManagement
  }))
);

const MessageCenter = React.lazy(() => 
  import("@/components/vendor/product/dashboard/MessageCenter").then(module => ({
    default: module.MessageCenter
  }))
);

// Memoized dashboard container
const DashboardContainer = memo(() => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section with optimized typography */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Product Dashboard</h1>
        <p className="text-base text-gray-600">Welcome back! Here's what's happening with your product business.</p>
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
          <ProductCatalogView />
        </Suspense>
        
        <Suspense fallback={
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <SkeletonLoader lines={6} />
          </div>
        }>
          <RFQManagement />
        </Suspense>
      </div>

      {/* Secondary Content - Load after main content */}
      <Suspense fallback={
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <SkeletonLoader lines={8} />
        </div>
      }>
        <OrdersManagement />
      </Suspense>

      <Suspense fallback={
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <SkeletonLoader lines={5} />
        </div>
      }>
        <MessageCenter />
      </Suspense>
    </div>
  );
});

DashboardContainer.displayName = "DashboardContainer";

const ProductVendorDashboard = () => {
  console.log("ProductVendorDashboard rendering - optimized version");
  usePerformanceMonitor("ProductVendorDashboard");

  // Initialize performance monitoring
  React.useEffect(() => {
    perfUtils.measureCoreWebVitals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <ProductVendorHeader /> */}
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <DashboardContainer />
      </main>
    </div>
  );
};

export default memo(ProductVendorDashboard);
