
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import IndustryProfile from "./pages/IndustryProfile";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import VendorProfile from "./pages/VendorProfile";
import ServiceVendorProfile from "./pages/ServiceVendorProfile";
import ProductVendorProfile from "./pages/ProductVendorProfile";
import LogisticsVendorProfile from "./pages/LogisticsVendorProfile";
import CreateRequirement from "./pages/CreateRequirement";
import CreatePurchaseOrder from "./pages/CreatePurchaseOrder";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Vendors from "./pages/Vendors";
import Experts from "./pages/Experts";
import WorkCompletionPayment from "./pages/WorkCompletionPayment";
import IndustryDashboard from "./pages/IndustryDashboard";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<IndustryDashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/industry-profile" element={<IndustryProfile />} />
            <Route path="/professional-profile" element={<ProfessionalProfile />} />
            <Route path="/vendor-profile" element={<VendorProfile />} />
            <Route path="/service-vendor-profile" element={<ServiceVendorProfile />} />
            <Route path="/product-vendor-profile" element={<ProductVendorProfile />} />
            <Route path="/logistics-vendor-profile" element={<LogisticsVendorProfile />} />
            <Route path="/create-requirement" element={<CreateRequirement />} />
            <Route path="/create-purchase-order" element={<CreatePurchaseOrder />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/work-completion-payment/:id" element={<WorkCompletionPayment />} />
            <Route path="/work-completion-payment" element={<WorkCompletionPayment />} />
            
            {/* New routes */}
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
