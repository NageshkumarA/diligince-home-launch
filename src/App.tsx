import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "@/components/ui/sonner";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Legal from "./pages/Legal";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import IndustryDashboard from "./pages/IndustryDashboard";
import Vendors from "./pages/Vendors";
import VendorProfile from "./pages/VendorProfile";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import VendorDetails from "./pages/VendorDetails";
import ProfessionalDetails from "./pages/ProfessionalDetails";
import CreateRequirement from "./pages/CreateRequirement";
import IndustryProjectWorkflow from "./pages/IndustryProjectWorkflow";
import WorkCompletionPayment from "./pages/WorkCompletionPayment";
import IndustryMessages from "./pages/IndustryMessages";
import CreatePurchaseOrder from "./pages/CreatePurchaseOrder";
import RequirementDetails from "./pages/RequirementDetails";
import { UserProvider } from "@/contexts/UserContext";
import { StakeholderProvider } from "@/contexts/StakeholderContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <StakeholderProvider>
          <div className="min-h-screen bg-background">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogArticle />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/industry-dashboard" element={<IndustryDashboard />} />
                <Route path="/vendors" element={<Vendors />} />
                <Route path="/vendor-profile" element={<VendorProfile />} />
                <Route path="/professional-profile" element={<ProfessionalProfile />} />
                <Route path="/vendor-details/:id" element={<VendorDetails />} />
                <Route path="/professional-details/:id" element={<ProfessionalDetails />} />
                <Route path="/create-requirement" element={<CreateRequirement />} />
                <Route path="/industry-project-workflow/:projectId" element={<IndustryProjectWorkflow />} />
                <Route path="/work-completion-payment/:orderId" element={<WorkCompletionPayment />} />
                <Route path="/industry-messages" element={<IndustryMessages />} />
                <Route path="/create-purchase-order" element={<CreatePurchaseOrder />} />
                 <Route path="/requirement/:id" element={<RequirementDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
            <Toaster />
          </div>
        </StakeholderProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
