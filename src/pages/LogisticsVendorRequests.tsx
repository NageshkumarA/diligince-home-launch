import React from 'react';
import { Truck, Package, TrendingUp, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { logisticsVendorHeaderConfig } from '@/utils/navigationConfigs';
import { Card } from '@/components/ui/card';
import { RequirementsFeed } from '@/components/shared/requirements/RequirementsFeed';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LogisticsVendorRequests = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const stats = [
    {
      title: 'Transport Requests',
      value: '24',
      subtitle: 'available jobs',
      icon: Package,
      color: 'text-[#eb2f96]',
      bgColor: 'bg-[#eb2f96]/10',
    },
    {
      title: 'AI Matched to Fleet',
      value: '8',
      subtitle: 'high relevance',
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Active Deliveries',
      value: '3',
      subtitle: 'in transit',
      icon: Truck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Response Time',
      value: '2.4h',
      subtitle: 'average',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const handleViewDetails = (id: string) => {
    toast({
      title: 'Opening Details',
      description: `Loading detailed information for requirement ${id}`,
    });
  };

  const handleSubmitQuote = (id: string) => {
    toast({
      title: 'Submit Quote',
      description: `Opening quote form for requirement ${id}`,
    });
  };

  return (
    <DashboardLayout config={logisticsVendorHeaderConfig}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transport Requests</h1>
          <p className="text-muted-foreground mt-2">
            Browse and respond to logistics requirements matched to your fleet capability
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <RequirementsFeed
          userType="logistics-vendor"
          categoryFilter="logistics"
          showAIRecommendations={true}
          maxRecommendations={5}
          onViewDetails={handleViewDetails}
          onSubmitQuote={handleSubmitQuote}
        />
      </div>
    </DashboardLayout>
  );
};

export default LogisticsVendorRequests;
