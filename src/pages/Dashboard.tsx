import React from 'react';
import { useUser } from '@/contexts/UserContext';
import DashboardCard from '../components/DashboardCard';
import { FileText, Quote, Workflow, Users, TrendingUp, Clock } from 'lucide-react';
import { SteppedForm } from '../components/form/stepped-form';

const Dashboard: React.FC = () => {
  const { user } = useUser();

  const getDashboardData = () => {
    if (user?.role === 'industry') {
      return {
        title: 'Industry Dashboard',
        cards: [
          { title: 'Posted Requirements', value: 24, icon: FileText, color: 'blue' as const, trend: { value: '+12%', isPositive: true } },
          { title: 'Active Chats', value: 18, icon: Users, color: 'green' as const, trend: { value: '+25%', isPositive: true } },
          { title: 'Received Proposals', value: 47, icon: TrendingUp, color: 'orange' as const, trend: { value: '+8%', isPositive: true } },
          { title: 'Completed Projects', value: 12, icon: Clock, color: 'purple' as const }
        ]
      };
    } else if (user?.role === 'professional') {
      return {
        title: 'Professional Dashboard',
        cards: [
          { title: 'Available Opportunities', value: 156, icon: FileText, color: 'blue' as const, trend: { value: '+15%', isPositive: true } },
          { title: 'Submitted Proposals', value: 23, icon: TrendingUp, color: 'green' as const },
          { title: 'Active Chats', value: 8, icon: Users, color: 'orange' as const, trend: { value: '+12%', isPositive: true } },
          { title: 'Completed Projects', value: 15, icon: Clock, color: 'purple' as const }
        ]
      };
    } else if (user?.role === 'vendor') {
      return {
        title: 'Vendor Dashboard',
        cards: [
          { title: 'Available Requirements', value: 89, icon: FileText, color: 'blue' as const, trend: { value: '+18%', isPositive: true } },
          { title: 'Sent Quotations', value: 34, icon: Quote, color: 'green' as const },
          { title: 'Active Negotiations', value: 12, icon: Users, color: 'orange' as const },
          { title: 'Won Projects', value: 28, icon: TrendingUp, color: 'purple' as const, trend: { value: '+22%', isPositive: true } }
        ]
      };
    } else {
      return {
        title: 'Dashboard',
        cards: []
      };
    }
  };

  const dashboardData = getDashboardData();
  const handleComplete = (data: any) => {
    console.log("Form completed with data:", data)
  }
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] mb-2">{dashboardData.title}</h1>
        {/* <p className="text-[#828282]">Welcome back! Here's what's happening with your account.</p> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData.cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6">
          <h3 className="text-lg font-semibold text-[#1a365d] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start space-x-3 p-3 hover:bg-[#FAFAFA] rounded-lg transition-colors">
                <div className="w-2 h-2 bg-[#2F80ED] rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#333333]">New requirement submitted</p>
                  <p className="text-xs text-[#828282]">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E0E0E0] p-6">
          <h3 className="text-lg font-semibold text-[#1a365d] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 border border-[#E0E0E0] rounded-lg hover:border-[#2F80ED] hover:bg-[#2F80ED]/5 transition-colors flex flex-row items-center justify-center">
              <FileText className="w-6 h-6 text-[#2F80ED] mx-2 mb-0" />
              <span className="text-sm font-medium text-[#1a365d]">New Request</span>
            </button>
            <button className="p-4 border border-[#E0E0E0] rounded-lg hover:border-[#27AE60] hover:bg-[#27AE60]/5 transition-colors flex flex-row items-center justify-center">
              <Users className="w-6 h-6 text-[#27AE60] mx-2 mb-0" />
              <span className="text-sm font-medium text-[#1a365d]">Invite User</span>
            </button>
            <button className="p-4 border border-[#E0E0E0] rounded-lg hover:border-[#F2994A] hover:bg-[#F2994A]/5 transition-colors flex flex-row items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#F2994A] mx-2 mb-0" />
              <span className="text-sm font-medium text-[#1a365d]">View Reports</span>
            </button>
            <button className="p-4 border border-[#E0E0E0] rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-colors flex flex-row items-center justify-center">
              <Quote className="w-6 h-6 text-purple-600 mx-2 mb-0" />
              <span className="text-sm font-medium text-[#1a365d]">Generate Quote</span>
            </button>
          </div>
        </div>
      </div>
      {/* <SteppedForm onComplete={handleComplete} /> */}

    </div>
  );
};

export default Dashboard;