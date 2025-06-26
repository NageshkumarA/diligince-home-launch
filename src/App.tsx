import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { FastLoadingState } from "@/components/shared/loading/FastLoadingState";
import { NotificationStoreProvider } from "@/contexts/NotificationStoreContext";

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import("@/pages/LandingPage"));
const IndustryDashboard = React.lazy(() => import("@/pages/IndustryDashboard"));
const IndustryRequirements = React.lazy(() => import("@/pages/IndustryRequirements"));
const IndustryWorkflows = React.lazy(() => import("@/pages/IndustryWorkflows"));
const IndustryStakeholders = React.lazy(() => import("@/pages/IndustryStakeholders"));
const IndustryMessages = React.lazy(() => import("@/pages/IndustryMessages"));
const IndustryProfile = React.lazy(() => import("@/pages/IndustryProfile"));
const IndustryDocuments = React.lazy(() => import("@/pages/IndustryDocuments"));
const IndustryProjectWorkflow = React.lazy(() => import("@/pages/IndustryProjectWorkflow"));
const CreateRequirement = React.lazy(() => import("@/pages/CreateRequirement"));
const RequirementDetails = React.lazy(() => import("@/pages/RequirementDetails"));
const CreatePurchaseOrder = React.lazy(() => import("@/pages/CreatePurchaseOrder"));
const WorkCompletionPayment = React.lazy(() => import("@/pages/WorkCompletionPayment"));
const ProductVendorDashboard = React.lazy(() => import("@/pages/ProductVendorDashboard"));
const ServiceVendorDashboard = React.lazy(() => import("@/pages/ServiceVendorDashboard"));
const LogisticsVendorDashboard = React.lazy(() => import("@/pages/LogisticsVendorDashboard"));
const ExpertDashboard = React.lazy(() => import("@/pages/ExpertDashboard"));
const VendorDetails = React.lazy(() => import("@/pages/VendorDetails"));

function App() {
  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
          <NotificationStoreProvider>
            <Suspense fallback={<FastLoadingState />}>
              <Routes>
                {/* Landing and Auth Routes */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Industry Routes */}
                <Route path="/industry-dashboard" element={<IndustryDashboard />} />
                <Route path="/industry-requirements" element={<IndustryRequirements />} />
                <Route path="/industry-workflows" element={<IndustryWorkflows />} />
                <Route path="/industry-stakeholders" element={<IndustryStakeholders />} />
                <Route path="/industry-messages" element={<IndustryMessages />} />
                <Route path="/industry-profile" element={<IndustryProfile />} />
                <Route path="/industry-documents" element={<IndustryDocuments />} />
                <Route path="/industry-project-workflow/:id" element={<IndustryProjectWorkflow />} />
                
                {/* Requirement Management */}
                <Route path="/create-requirement" element={<CreateRequirement />} />
                <Route path="/requirement/:id" element={<RequirementDetails />} />
                
                {/* Purchase Order Management */}
                <Route path="/create-purchase-order" element={<CreatePurchaseOrder />} />
                <Route path="/work-completion-payment/:id" element={<WorkCompletionPayment />} />
                
                {/* Vendor Dashboards */}
                <Route path="/product-vendor-dashboard" element={<ProductVendorDashboard />} />
                <Route path="/service-vendor-dashboard" element={<ServiceVendorDashboard />} />
                <Route path="/logistics-vendor-dashboard" element={<LogisticsVendorDashboard />} />
                <Route path="/expert-dashboard" element={<ExpertDashboard />} />
                
                {/* Vendor Details */}
                <Route path="/vendor-details/:id" element={<VendorDetails />} />
                
                {/* Fallback Route */}
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </Suspense>
            <Toaster />
          </NotificationStoreProvider>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
