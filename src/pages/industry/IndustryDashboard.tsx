
import IndustryHeader from "@/components/industry/IndustryHeader";
import { DashboardStats } from "@/components/industry/dashboard/DashboardStats";
import { ActiveRequirements } from "@/components/industry/dashboard/ActiveRequirements";
import { RecentActivity } from "@/components/industry/dashboard/RecentActivity";
import { QuickActions } from "@/components/industry/dashboard/QuickActions";
import { VendorRecommendations } from "@/components/industry/dashboard/VendorRecommendations";

const IndustryDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <IndustryHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Industry Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your industrial operations.</p>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ActiveRequirements />
              <RecentActivity />
            </div>
            <div className="space-y-6">
              <QuickActions />
              <VendorRecommendations />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndustryDashboard;
