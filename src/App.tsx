
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, NotificationProvider, UserProvider, VendorSpecializationProvider } from "@/contexts";
import ErrorBoundary from "@/components/ErrorBoundary";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

// Import all pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Vendors from "./pages/Vendors";
import Experts from "./pages/Experts";
import IndustryDashboard from "./pages/IndustryDashboard";
import IndustryProfile from "./pages/IndustryProfile";
import IndustryMessages from "./pages/IndustryMessages";
import IndustryDocuments from "./pages/IndustryDocuments";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import ProfessionalCalendar from "./pages/ProfessionalCalendar";
import ProfessionalOpportunities from "./pages/ProfessionalOpportunities";
import ProfessionalMessages from "./pages/ProfessionalMessages";
import ServiceVendorDashboard from "./pages/ServiceVendorDashboard";
import ServiceVendorProfile from "./pages/ServiceVendorProfile";
import ServiceVendorRFQs from "./pages/ServiceVendorRFQs";
import ServiceVendorServices from "./pages/ServiceVendorServices";
import ServiceVendorProjects from "./pages/ServiceVendorProjects";
import ServiceVendorMessages from "./pages/ServiceVendorMessages";
import ProductVendorDashboard from "./pages/ProductVendorDashboard";
import ProductVendorProfile from "./pages/ProductVendorProfile";
import ProductVendorRFQs from "./pages/ProductVendorRFQs";
import ProductVendorCatalog from "./pages/ProductVendorCatalog";
import ProductVendorOrders from "./pages/ProductVendorOrders";
import ProductVendorMessages from "./pages/ProductVendorMessages";
import LogisticsVendorDashboard from "./pages/LogisticsVendorDashboard";
import LogisticsVendorProfile from "./pages/LogisticsVendorProfile";
import VendorProfile from "./pages/VendorProfile";
import CreateRequirement from "./pages/CreateRequirement";
import CreatePurchaseOrder from "./pages/CreatePurchaseOrder";
import WorkCompletionPayment from "./pages/WorkCompletionPayment";
import LogisticsVendorRequests from "./pages/LogisticsVendorRequests";
import LogisticsVendorFleet from "./pages/LogisticsVendorFleet";
import LogisticsVendorDeliveries from "./pages/LogisticsVendorDeliveries";
import LogisticsVendorMessages from "./pages/LogisticsVendorMessages";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserProvider>
            <VendorSpecializationProvider>
              <NotificationProvider>
                <TooltipProvider>
                  <BrowserRouter>
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
                      <Route path="/create-purchase-order" element={<RouteErrorBoundary routeName="Create Purchase Order"><CreatePurchaseOrder /></RouteErrorBoundary>} />
                      <Route path="/work-completion-payment" element={<RouteErrorBoundary routeName="Work Completion Payment"><WorkCompletionPayment /></RouteErrorBoundary>} />
                      
                      {/* 404 Route */}
                      <Route path="*" element={<RouteErrorBoundary routeName="404"><NotFound /></RouteErrorBoundary>} />
                    </Routes>
                  </BrowserRouter>
                  <Toaster />
                  <Sonner />
                </TooltipProvider>
              </NotificationProvider>
            </VendorSpecializationProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

export default App;
