
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, NotificationProvider, UserProvider, VendorSpecializationProvider } from "@/contexts";

// Common pages
import Index from "./pages/common/Index";
import About from "./pages/common/About";
import Contact from "./pages/common/Contact";
import Blog from "./pages/common/Blog";
import Careers from "./pages/common/Careers";
import Pricing from "./pages/common/Pricing";
import Terms from "./pages/common/Terms";
import Privacy from "./pages/common/Privacy";
import Vendors from "./pages/common/Vendors";
import Experts from "./pages/common/Experts";
import WorkCompletionPayment from "./pages/common/WorkCompletionPayment";

// Auth pages
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";

// Industry pages
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import IndustryProfile from "./pages/industry/IndustryProfile";
import IndustryMessages from "./pages/industry/IndustryMessages";
import IndustryDocuments from "./pages/industry/IndustryDocuments";
import CreateRequirement from "./pages/industry/CreateRequirement";
import CreatePurchaseOrder from "./pages/industry/CreatePurchaseOrder";

// Professional pages
import ProfessionalDashboard from "./pages/professional/ProfessionalDashboard";
import ProfessionalProfile from "./pages/professional/ProfessionalProfile";
import ProfessionalCalendar from "./pages/professional/ProfessionalCalendar";
import ProfessionalOpportunities from "./pages/professional/ProfessionalOpportunities";
import ProfessionalMessages from "./pages/professional/ProfessionalMessages";

// Service vendor pages
import ServiceVendorDashboard from "./pages/service-vendor/ServiceVendorDashboard";
import ServiceVendorProfile from "./pages/service-vendor/ServiceVendorProfile";
import ServiceVendorRFQs from "./pages/service-vendor/ServiceVendorRFQs";
import ServiceVendorServices from "./pages/service-vendor/ServiceVendorServices";
import ServiceVendorProjects from "./pages/service-vendor/ServiceVendorProjects";
import ServiceVendorMessages from "./pages/service-vendor/ServiceVendorMessages";

// Product vendor pages
import ProductVendorDashboard from "./pages/product-vendor/ProductVendorDashboard";
import ProductVendorProfile from "./pages/product-vendor/ProductVendorProfile";
import ProductVendorRFQs from "./pages/product-vendor/ProductVendorRFQs";
import ProductVendorCatalog from "./pages/product-vendor/ProductVendorCatalog";
import ProductVendorOrders from "./pages/product-vendor/ProductVendorOrders";
import ProductVendorMessages from "./pages/product-vendor/ProductVendorMessages";

// Logistics vendor pages
import LogisticsVendorDashboard from "./pages/logistics-vendor/LogisticsVendorDashboard";
import LogisticsVendorProfile from "./pages/logistics-vendor/LogisticsVendorProfile";
import LogisticsVendorRequests from "./pages/logistics-vendor/LogisticsVendorRequests";
import LogisticsVendorFleet from "./pages/logistics-vendor/LogisticsVendorFleet";
import LogisticsVendorDeliveries from "./pages/logistics-vendor/LogisticsVendorDeliveries";
import LogisticsVendorMessages from "./pages/logistics-vendor/LogisticsVendorMessages";

// Shared pages
import NotFound from "./pages/shared/NotFound";
import VendorProfile from "./pages/shared/VendorProfile";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <VendorSpecializationProvider>
            <NotificationProvider>
              <TooltipProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/vendors" element={<Vendors />} />
                    <Route path="/experts" element={<Experts />} />
                    <Route path="/industry-dashboard" element={<IndustryDashboard />} />
                    <Route path="/industry-profile" element={<IndustryProfile />} />
                    <Route path="/industry-messages" element={<IndustryMessages />} />
                    <Route path="/industry-documents" element={<IndustryDocuments />} />
                    <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
                    <Route path="/professional-calendar" element={<ProfessionalCalendar />} />
                    <Route path="/professional-opportunities" element={<ProfessionalOpportunities />} />
                    <Route path="/professional-messages" element={<ProfessionalMessages />} />
                    <Route path="/service-vendor-dashboard" element={<ServiceVendorDashboard />} />
                    <Route path="/service-vendor-rfqs" element={<ServiceVendorRFQs />} />
                    <Route path="/service-vendor-services" element={<ServiceVendorServices />} />
                    <Route path="/service-vendor-projects" element={<ServiceVendorProjects />} />
                    <Route path="/service-vendor-messages" element={<ServiceVendorMessages />} />
                    <Route path="/product-vendor-dashboard" element={<ProductVendorDashboard />} />
                    <Route path="/product-vendor-rfqs" element={<ProductVendorRFQs />} />
                    <Route path="/product-vendor-catalog" element={<ProductVendorCatalog />} />
                    <Route path="/product-vendor-orders" element={<ProductVendorOrders />} />
                    <Route path="/product-vendor-messages" element={<ProductVendorMessages />} />
                    <Route path="/logistics-vendor-dashboard" element={<LogisticsVendorDashboard />} />
                    <Route path="/messages" element={<IndustryMessages />} />
                    <Route path="/documents" element={<IndustryDocuments />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/professional-profile" element={<ProfessionalProfile />} />
                    <Route path="/service-vendor-profile" element={<ServiceVendorProfile />} />
                    <Route path="/product-vendor-profile" element={<ProductVendorProfile />} />
                    <Route path="/logistics-vendor-profile" element={<LogisticsVendorProfile />} />
                    <Route path="/vendor-profile" element={<VendorProfile />} />
                    <Route path="/create-requirement" element={<CreateRequirement />} />
                    <Route path="/create-purchase-order" element={<CreatePurchaseOrder />} />
                    <Route path="/work-completion-payment" element={<WorkCompletionPayment />} />
                    <Route path="/logistics-vendor-dashboard" element={<LogisticsVendorDashboard />} />
                    <Route path="/logistics-vendor-requests" element={<LogisticsVendorRequests />} />
                    <Route path="/logistics-vendor-fleet" element={<LogisticsVendorFleet />} />
                    <Route path="/logistics-vendor-deliveries" element={<LogisticsVendorDeliveries />} />
                    <Route path="/logistics-vendor-messages" element={<LogisticsVendorMessages />} />
                    <Route path="/logistics-vendor-profile" element={<LogisticsVendorProfile />} />
                    
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
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
  </React.StrictMode>
);

export default App;
