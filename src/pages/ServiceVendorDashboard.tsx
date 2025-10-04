import React, { Suspense, memo } from "react";
import { ServiceVendorHeader } from "@/components/vendor/ServiceVendorHeader";
import { SkeletonLoader } from "@/components/shared/loading/SkeletonLoader";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { perfUtils } from "@/utils/performance";

// Lazy load dashboard components
const DashboardStats = React.lazy(() =>
  import("@/components/vendor/service/dashboard/DashboardStats").then(
    (module) => ({ default: module.DashboardStats })
  )
);

const TeamAvailability = React.lazy(() =>
  import("@/components/vendor/service/dashboard/TeamAvailability").then(
    (module) => ({ default: module.TeamAvailability })
  )
);

const RFQManagement = React.lazy(() =>
  import("@/components/vendor/service/dashboard/RFQManagement").then(
    (module) => ({ default: module.RFQManagement })
  )
);

const ActiveProjects = React.lazy(() =>
  import("@/components/vendor/service/dashboard/ActiveProjects").then(
    (module) => ({ default: module.ActiveProjects })
  )
);

const MessageCenter = React.lazy(() =>
  import("@/components/vendor/service/dashboard/MessageCenter").then(
    (module) => ({ default: module.MessageCenter })
  )
);

// Memoized dashboard container
const DashboardContainer = memo(() => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Industrial Service Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your industrial service
          operations.
        </p>
      </div>

      {/* Stats Cards */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg border border-gray-100"
              >
                <SkeletonLoader lines={2} height="20px" />
              </div>
            ))}
          </div>
        }
      >
        <DashboardStats />
      </Suspense>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense
          fallback={
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <SkeletonLoader lines={6} />
            </div>
          }
        >
          <RFQManagement />
        </Suspense>

        <Suspense
          fallback={
            <div className="bg-white p-6 rounded-lg border border-gray-100">
              <SkeletonLoader lines={6} />
            </div>
          }
        >
          <TeamAvailability />
        </Suspense>
      </div>

      {/* Active Projects */}
      <Suspense
        fallback={
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <SkeletonLoader lines={8} />
          </div>
        }
      >
        <ActiveProjects />
      </Suspense>

      {/* Messages Hub */}
      <Suspense
        fallback={
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <SkeletonLoader lines={5} />
          </div>
        }
      >
        <MessageCenter />
      </Suspense>
    </div>
  );
});

DashboardContainer.displayName = "DashboardContainer";

const ServiceVendorDashboard: React.FC = () => {
  console.log("ServiceVendorDashboard rendering - optimized version");
  usePerformanceMonitor("ServiceVendorDashboard");

  // Initialize performance monitoring
  React.useEffect(() => {
    perfUtils.measureCoreWebVitals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <ServiceVendorHeader /> */}

      <main className="pt-32 p-6 lg:p-8">
        <DashboardContainer />
      </main>
    </div>
  );
};

export default memo(ServiceVendorDashboard);
