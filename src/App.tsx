
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

import { UserProvider } from "@/contexts/UserContext";
import { VendorSpecializationProvider } from "@/contexts/VendorSpecializationContext";
import { NotificationStoreProvider } from "@/contexts/NotificationStoreContext";
import { ApprovalProvider } from "@/contexts/ApprovalContext";

import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { FastLoadingState } from "@/components/shared/loading/FastLoadingState";

// Lazy load pages for better performance
const HomePage = React.lazy(() => import("@/pages/Index"));
const IndustryDashboard = React.lazy(() => import("@/pages/IndustryDashboard"));
const IndustryWorkflows = React.lazy(() => import("@/pages/IndustryWorkflows"));
const IndustryProjectWorkflow = React.lazy(() => import("@/pages/IndustryProjectWorkflow"));

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <ErrorBoundary>
            <UserProvider>
              <VendorSpecializationProvider>
                <NotificationStoreProvider>
                  <ApprovalProvider>
                    <Suspense fallback={<FastLoadingState />}>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/industry-dashboard" element={<IndustryDashboard />} />
                        <Route path="/industry-workflows" element={<IndustryWorkflows />} />
                        <Route path="/industry-project-workflow/:projectId" element={<IndustryProjectWorkflow />} />
                        {/* Add other routes as needed */}
                      </Routes>
                    </Suspense>
                    <Toaster />
                  </ApprovalProvider>
                </NotificationStoreProvider>
              </VendorSpecializationProvider>
            </UserProvider>
          </ErrorBoundary>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
