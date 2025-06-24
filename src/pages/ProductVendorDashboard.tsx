
import React, { useState, useEffect } from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { DashboardStats } from "@/components/vendor/product/dashboard/DashboardStats";
import { ProductCatalogView } from "@/components/vendor/product/dashboard/ProductCatalogView";
import { RFQManagement } from "@/components/vendor/product/dashboard/RFQManagement";
import { OrdersManagement } from "@/components/vendor/product/dashboard/OrdersManagement";
import { MessageCenter } from "@/components/vendor/product/dashboard/MessageCenter";
import { LoadingState } from "@/components/shared/loading/LoadingState";
import { LoadingCard } from "@/components/shared/loading/LoadingCard";

const ProductVendorDashboard = () => {
  console.log("ProductVendorDashboard rendering");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <VendorHeader />
        
        <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <LoadingState message="Loading your product dashboard..." size="lg" />
            
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
      <VendorHeader />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section with optimized typography */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Product Dashboard</h1>
            <p className="text-base text-gray-600">Welcome back! Here's what's happening with your product business.</p>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Catalog */}
            <ProductCatalogView />
            
            {/* RFQ Management */}
            <RFQManagement />
          </div>

          {/* Orders Management */}
          <OrdersManagement />

          {/* Messages Hub */}
          <MessageCenter />
        </div>
      </main>
    </div>
  );
};

export default ProductVendorDashboard;
