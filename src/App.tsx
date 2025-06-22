
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, NotificationProvider, UserProvider } from "@/contexts";
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
import ProductVendorDashboard from "./pages/ProductVendorDashboard";
import ProductVendorProfile from "./pages/ProductVendorProfile";
import LogisticsVendorDashboard from "./pages/LogisticsVendorDashboard";
import LogisticsVendorProfile from "./pages/LogisticsVendorProfile";
import VendorProfile from "./pages/VendorProfile";
import CreateRequirement from "./pages/CreateRequirement";
import CreatePurchaseOrder from "./pages/CreatePurchaseOrder";
import WorkCompletionPayment from "./pages/WorkCompletionPayment";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
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
                  <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
                  <Route path="/professional-calendar" element={<ProfessionalCalendar />} />
                  <Route path="/professional-opportunities" element={<ProfessionalOpportunities />} />
                  <Route path="/professional-messages" element={<ProfessionalMessages />} />
                  <Route path="/service-vendor-dashboard" element={<ServiceVendorDashboard />} />
                  <Route path="/product-vendor-dashboard" element={<ProductVendorDashboard />} />
                  <Route path="/logistics-vendor-dashboard" element={<LogisticsVendorDashboard />} />
                  <Route path="/messages" element={<IndustryMessages />} />
                  <Route path="/documents" element={<IndustryDocuments />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/industry-profile" element={<IndustryProfile />} />
                  <Route path="/professional-profile" element={<ProfessionalProfile />} />
                  <Route path="/service-vendor-profile" element={<ServiceVendorProfile />} />
                  <Route path="/product-vendor-profile" element={<ProductVendorProfile />} />
                  <Route path="/logistics-vendor-profile" element={<LogisticsVendorProfile />} />
                  <Route path="/vendor-profile" element={<VendorProfile />} />
                  <Route path="/create-requirement" element={<CreateRequirement />} />
                  <Route path="/create-purchase-order" element={<CreatePurchaseOrder />} />
                  <Route path="/work-completion-payment" element={<WorkCompletionPayment />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </NotificationProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
