import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, NotificationProvider, UserProvider, VendorSpecializationProvider, RequirementProvider } from "@/contexts";
import ErrorBoundary from "@/components/ErrorBoundary";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

// Lazy load all page components
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Careers = React.lazy(() => import("./pages/Careers"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Vendors = React.lazy(() => import("./pages/Vendors"));
const Experts = React.lazy(() => import("./pages/Experts"));
const IndustryDashboard = React.lazy(() => import("./pages/IndustryDashboard"));
const IndustryProfile = React.lazy(() => import("./pages/IndustryProfile"));
const IndustryMessages = React.lazy(() => import("./pages/IndustryMessages"));
const IndustryDocuments = React.lazy(() => import("./pages/IndustryDocuments"));
const ProfessionalDashboard = React.lazy(() => import("./pages/ProfessionalDashboard"));
const ProfessionalProfile = React.lazy(() => import("./pages/ProfessionalProfile"));
const ProfessionalCalendar = React.lazy(() => import("./pages/ProfessionalCalendar"));
const ProfessionalOpportunities = React.lazy(() => import("./pages/ProfessionalOpportunities"));
const ProfessionalMessages = React.lazy(() => import("./pages/ProfessionalMessages"));
const ServiceVendorDashboard = React.lazy(() => import("./pages/ServiceVendorDashboard"));
const ServiceVendorProfile = React.lazy(() => import("./pages/ServiceVendorProfile"));
const ServiceVendorRFQs = React.lazy(() => import("./pages/ServiceVendorRFQs"));
const ServiceVendorServices = React.lazy(() => import("./pages/ServiceVendorServices"));
const ServiceVendorProjects = React.lazy(() => import("./pages/ServiceVendorProjects"));
const ServiceVendorMessages = React.lazy(() => import("./pages/ServiceVendorMessages"));
const ProductVendorDashboard = React.lazy(() => import("./pages/ProductVendorDashboard"));
const ProductVendorProfile = React.lazy(() => import("./pages/ProductVendorProfile"));
const ProductVendorRFQs = React.lazy(() => import("./pages/ProductVendorRFQs"));
const ProductVendorCatalog = React.lazy(() => import("./pages/ProductVendorCatalog"));
const ProductVendorOrders = React.lazy(() => import("./pages/ProductVendorOrders"));
const ProductVendorMessages = React.lazy(() => import("./pages/ProductVendorMessages"));
const LogisticsVendorDashboard = React.lazy(() => import("./pages/LogisticsVendorDashboard"));
const LogisticsVendorProfile = React.lazy(() => import("./pages/LogisticsVendorProfile"));
const VendorProfile = React.lazy(() => import("./pages/VendorProfile"));
const CreateRequirement = React.lazy(() => import("./pages/CreateRequirement"));
const CreatePurchaseOrder = React.lazy(() => import("./pages/CreatePurchaseOrder"));
const WorkCompletionPayment = React.lazy(() => import("./pages/WorkCompletionPayment"));
const LogisticsVendorRequests = React.lazy(() => import("./pages/LogisticsVendorRequests"));
const LogisticsVendorFleet = React.lazy(() => import("./pages/LogisticsVendorFleet"));
const LogisticsVendorDeliveries = React.lazy(() => import("./pages/LogisticsVendorDeliveries"));
const LogisticsVendorMessages = React.lazy(() => import("./pages/LogisticsVendorMessages"));

const queryClient = new QueryClient();

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ErrorBoundary>
          <UserProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
              <RequirementProvider>
                <VendorSpecializationProvider>
                  <NotificationProvider>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<RouteErrorBoundary routeName="Home"><Index /></RouteErrorBoundary>} />
                      <Route path="/about" element={<RouteErrorBoundary routeName="About"><About /></RouteErrorBoundary>} />
                      <Route path="/contact" element={<RouteErrorBoundary routeName="Contact"><Contact /></RouteErrorBoundary>} />
                      <Route path="/blog" element={<RouteErrorBoundary routeName="Blog"><Blog /></RouteErrorBoundary>} />
                      <Route path="/careers" element={<RouteErrorBoundary routeName="Careers"><Careers /></RouteErrorBoundary>} />
                      <Route path="/pricing" element={<RouteErrorBoundary routeName="Pricing"><Pricing /></RouteErrorBoundary>} />
                      <Route path="/terms" element={<RouteErrorBoundary routeName="Terms"><Terms /></RouteErrorBoundary>} />
                      <Route path="/privacy" element={<RouteErrorBoundary routeName="Privacy"><Privacy /></RouteErrorBoundary>} />
                      <Route path="/vendors" element={<RouteErrorBoundary routeName="Vendors"><Vendors /></RouteErrorBoundary>} />
                      <Route path="/experts" element={<RouteErrorBoundary routeName="Experts"><Experts /></RouteErrorBoundary>} />
                      
                      {/* Auth Routes */}
                      <Route path="/signup" element={<RouteErrorBoundary routeName="Sign Up"><SignUp /></RouteErrorBoundary>} />
                      <Route path="/signin" element={<RouteErrorBoundary routeName="Sign In"><SignIn /></RouteErrorBoundary>} />
                      
                      {/* Industry Routes */}
                      <Route path="/industry-dashboard" element={<RouteErrorBoundary routeName="Industry Dashboard"><IndustryDashboard /></RouteErrorBoundary>} />
                      <Route path="/industry-profile" element={<RouteErrorBoundary routeName="Industry Profile"><IndustryProfile /></RouteErrorBoundary>} />
                      <Route path="/industry-messages" element={<RouteErrorBoundary routeName="Industry Messages"><IndustryMessages /></RouteErrorBoundary>} />
                      <Route path="/industry-documents" element={<RouteErrorBoundary routeName="Industry Documents"><IndustryDocuments /></RouteErrorBoundary>} />
                      
                      {/* Professional Routes */}
                      <Route path="/professional-dashboard" element={<RouteErrorBoundary routeName="Professional Dashboard"><ProfessionalDashboard /></RouteErrorBoundary>} />
                      <Route path="/professional-profile" element={<RouteErrorBoundary routeName="Professional Profile"><ProfessionalProfile /></RouteErrorBoundary>} />
                      <Route path="/professional-calendar" element={<RouteErrorBoundary routeName="Professional Calendar"><ProfessionalCalendar /></RouteErrorBoundary>} />
                      <Route path="/professional-opportunities" element={<RouteErrorBoundary routeName="Professional Opportunities"><ProfessionalOpportunities /></RouteErrorBoundary>} />
                      <Route path="/professional-messages" element={<RouteErrorBoundary routeName="Professional Messages"><ProfessionalMessages /></RouteErrorBoundary>} />
                      
                      {/* Service Vendor Routes */}
                      <Route path="/service-vendor-dashboard" element={<RouteErrorBoundary routeName="Service Vendor Dashboard"><ServiceVendorDashboard /></RouteErrorBoundary>} />
                      <Route path="/service-vendor-profile" element={<RouteErrorBoundary routeName="Service Vendor Profile"><ServiceVendorProfile /></RouteErrorBoundary>} />
                      <Route path="/service-vendor-rfqs" element={<RouteErrorBoundary routeName="Service Vendor RFQs"><ServiceVendorRFQs /></RouteErrorBoundary>} />
                      <Route path="/service-vendor-services" element={<RouteErrorBoundary routeName="Service Vendor Services"><ServiceVendorServices /></RouteErrorBoundary>} />
                      <Route path="/service-vendor-projects" element={<RouteErrorBoundary routeName="Service Vendor Projects"><ServiceVendorProjects /></RouteErrorBoundary>} />
                      <Route path="/service-vendor-messages" element={<RouteErrorBoundary routeName="Service Vendor Messages"><ServiceVendorMessages /></RouteErrorBoundary>} />
                      
                      {/* Product Vendor Routes */}
                      <Route path="/product-vendor-dashboard" element={<RouteErrorBoundary routeName="Product Vendor Dashboard"><ProductVendorDashboard /></RouteErrorBoundary>} />
                      <Route path="/product-vendor-profile" element={<RouteErrorBoundary routeName="Product Vendor Profile"><ProductVendorProfile /></RouteErrorBoundary>} />
                      <Route path="/product-vendor-rfqs" element={<RouteErrorBoundary routeName="Product Vendor RFQs"><ProductVendorRFQs /></RouteErrorBoundary>} />
                      <Route path="/product-vendor-catalog" element={<RouteErrorBoundary routeName="Product Vendor Catalog"><ProductVendorCatalog /></RouteErrorBoundary>} />
                      <Route path="/product-vendor-orders" element={<RouteErrorBoundary routeName="Product Vendor Orders"><ProductVendorOrders /></RouteErrorBoundary>} />
                      <Route path="/product-vendor-messages" element={<RouteErrorBoundary routeName="Product Vendor Messages"><ProductVendorMessages /></RouteErrorBoundary>} />
                      
                      {/* Logistics Vendor Routes */}
                      <Route path="/logistics-vendor-dashboard" element={<RouteErrorBoundary routeName="Logistics Vendor Dashboard"><LogisticsVendorDashboard /></RouteErrorBoundary>} />
                      <Route path="/logistics-vendor-profile" element={<RouteErrorBoundary routeName="Logistics Vendor Profile"><LogisticsVendorProfile /></RouteErrorBoundary>} />
                      <Route path="/logistics-vendor-requests" element={<RouteErrorBoundary routeName="Logistics Vendor Requests"><LogisticsVendorRequests /></RouteErrorBoundary>} />
                      <Route path="/logistics-vendor-fleet" element={<RouteErrorBoundary routeName="Logistics Vendor Fleet"><LogisticsVendorFleet /></RouteErrorBoundary>} />
                      <Route path="/logistics-vendor-deliveries" element={<RouteErrorBoundary routeName="Logistics Vendor Deliveries"><LogisticsVendorDeliveries /></RouteErrorBoundary>} />
                      <Route path="/logistics-vendor-messages" element={<RouteErrorBoundary routeName="Logistics Vendor Messages"><LogisticsVendorMessages /></RouteErrorBoundary>} />
                      
                      {/* Shared Routes */}
                      <Route path="/messages" element={<RouteErrorBoundary routeName="Messages"><IndustryMessages /></RouteErrorBoundary>} />
                      <Route path="/documents" element={<RouteErrorBoundary routeName="Documents"><IndustryDocuments /></RouteErrorBoundary>} />
                      <Route path="/vendor-profile" element={<RouteErrorBoundary routeName="Vendor Profile"><VendorProfile /></RouteErrorBoundary>} />
                      <Route path="/create-requirement" element={<RouteErrorBoundary routeName="Create Requirement"><CreateRequirement /></RouteErrorBoundary>} />
                      <Route 
                        path="/work-completion-payment/:id" 
                        element={<WorkCompletionPayment />} 
                      />
                      
                      {/* 404 Route */}
                      <Route path="*" element={<RouteErrorBoundary routeName="404"><NotFound /></RouteErrorBoundary>} />
                    </Routes>
                    <Toaster />
                  </NotificationProvider>
                </VendorSpecializationProvider>
              </RequirementProvider>
            </ThemeProvider>
          </UserProvider>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
