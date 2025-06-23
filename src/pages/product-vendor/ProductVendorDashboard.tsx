
import React from "react";
import VendorHeader from "@/components/vendor/VendorHeader";
import { DashboardStats } from "@/components/vendor/product/dashboard/DashboardStats";
import { ProductCatalogView } from "@/components/vendor/product/dashboard/ProductCatalogView";
import { RFQManagement } from "@/components/vendor/product/dashboard/RFQManagement";
import { OrdersManagement } from "@/components/vendor/product/dashboard/OrdersManagement";
import { MessageCenter } from "@/components/vendor/product/dashboard/MessageCenter";

const ProductVendorDashboard = () => {
  console.log("ProductVendorDashboard rendering");

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <main className="pt-32 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 mt-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your product business.</p>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductCatalogView />
            <RFQManagement />
          </div>

          <OrdersManagement />
          <MessageCenter />
        </div>
      </main>
    </div>
  );
};

export default ProductVendorDashboard;
