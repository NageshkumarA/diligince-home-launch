import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { FastLoadingState } from "@/components/shared/loading/FastLoadingState";
import { NotificationStoreProvider } from "@/contexts/NotificationStoreContext";
import { UserProvider } from "@/contexts/UserContext";
import { VendorSpecializationProvider } from "@/contexts/VendorSpecializationContext";

// Use Index as the main landing page (it has the proper component structure)
const HomePage = React.lazy(() => import("@/pages/Index"));

// Navigation & Info Routes
const About = React.lazy(() => import("@/pages/About"));
const Pricing = React.lazy(() => import("@/pages/Pricing"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Blog = React.lazy(() => import("@/pages/Blog"));
const BlogArticle = React.lazy(() => import("@/pages/BlogArticle"));
const Careers = React.lazy(() => import("@/pages/Careers"));

// Legal & Administrative Routes
const Privacy = React.lazy(() => import("@/pages/Privacy"));
const Terms = React.lazy(() => import("@/pages/Terms"));
const Legal = React.lazy(() => import("@/pages/Legal"));

// Authentication Routes
const SignIn = React.lazy(() => import("@/pages/SignIn"));
const SignUp = React.lazy(() => import("@/pages/SignUp"));
const ForgotPassword = React.lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("@/pages/ResetPassword"));

// Industry Routes
const IndustryDashboard = React.lazy(() => import("@/pages/IndustryDashboard"));
const IndustryRequirements = React.lazy(() => import("@/pages/IndustryRequirements"));
const IndustryWorkflows = React.lazy(() => import("@/pages/IndustryWorkflows"));
const IndustryStakeholders = React.lazy(() => import("@/pages/IndustryStakeholders"));
const IndustryMessages = React.lazy(() => import("@/pages/IndustryMessages"));
const IndustryProfile = React.lazy(() => import("@/pages/IndustryProfile"));
const IndustryDocuments = React.lazy(() => import("@/pages/IndustryDocuments"));
const IndustryProjectWorkflow = React.lazy(() => import("@/pages/IndustryProjectWorkflow"));

// Professional/Expert Routes
const ProfessionalDashboard = React.lazy(() => import("@/pages/ProfessionalDashboard"));
const ProfessionalProfile = React.lazy(() => import("@/pages/ProfessionalProfile"));
const ProfessionalCalendar = React.lazy(() => import("@/pages/ProfessionalCalendar"));
const ProfessionalMessages = React.lazy(() => import("@/pages/ProfessionalMessages"));
const ProfessionalOpportunities = React.lazy(() => import("@/pages/ProfessionalOpportunities"));
const ProfessionalDetails = React.lazy(() => import("@/pages/ProfessionalDetails"));
const ExpertDashboard = React.lazy(() => import("@/pages/ExpertDashboard"));
const Experts = React.lazy(() => import("@/pages/Experts"));

// Service Vendor Routes
const ServiceVendorDashboard = React.lazy(() => import("@/pages/ServiceVendorDashboard"));
const ServiceVendorProfile = React.lazy(() => import("@/pages/ServiceVendorProfile"));
const ServiceVendorMessages = React.lazy(() => import("@/pages/ServiceVendorMessages"));
const ServiceVendorProjects = React.lazy(() => import("@/pages/ServiceVendorProjects"));
const ServiceVendorRFQs = React.lazy(() => import("@/pages/ServiceVendorRFQs"));
const ServiceVendorServices = React.lazy(() => import("@/pages/ServiceVendorServices"));

// Product Vendor Routes
const ProductVendorDashboard = React.lazy(() => import("@/pages/ProductVendorDashboard"));
const ProductVendorProfile = React.lazy(() => import("@/pages/ProductVendorProfile"));
const ProductVendorCatalog = React.lazy(() => import("@/pages/ProductVendorCatalog"));
const ProductVendorMessages = React.lazy(() => import("@/pages/ProductVendorMessages"));
const ProductVendorOrders = React.lazy(() => import("@/pages/ProductVendorOrders"));
const ProductVendorRFQs = React.lazy(() => import("@/pages/ProductVendorRFQs"));

// Logistics Vendor Routes
const LogisticsVendorDashboard = React.lazy(() => import("@/pages/LogisticsVendorDashboard"));
const LogisticsVendorProfile = React.lazy(() => import("@/pages/LogisticsVendorProfile"));
const LogisticsVendorDeliveries = React.lazy(() => import("@/pages/LogisticsVendorDeliveries"));
const LogisticsVendorFleet = React.lazy(() => import("@/pages/LogisticsVendorFleet"));
const LogisticsVendorMessages = React.lazy(() => import("@/pages/LogisticsVendorMessages"));
const LogisticsVendorRequests = React.lazy(() => import("@/pages/LogisticsVendorRequests"));

// Vendor Management & Listings
const Vendors = React.lazy(() => import("@/pages/Vendors"));
const VendorDetails = React.lazy(() => import("@/pages/VendorDetails"));
const VendorProfile = React.lazy(() => import("@/pages/VendorProfile"));

// Requirement & Purchase Order Management
const CreateRequirement = React.lazy(() => import("@/pages/CreateRequirement"));
const RequirementDetails = React.lazy(() => import("@/pages/RequirementDetails"));
const CreatePurchaseOrder = React.lazy(() => import("@/pages/CreatePurchaseOrder"));
const WorkCompletionPayment = React.lazy(() => import("@/pages/WorkCompletionPayment"));

// Profile & Onboarding
const ProfileCompletion = React.lazy(() => import("@/pages/ProfileCompletion"));
const StakeholderOnboarding = React.lazy(() => import("@/pages/StakeholderOnboarding"));

// Test Route
const TestPage = React.lazy(() => import("@/pages/TestPage"));

// 404 Route
const NotFound = React.lazy(() => import("@/pages/NotFound"));

function App() {
  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
          <UserProvider>
            <VendorSpecializationProvider>
              <NotificationStoreProvider>
                <Suspense fallback={<FastLoadingState />}>
                  <Routes>
                    {/* Homepage Route - Using Index as the main landing page */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/* Test Route */}
                    <Route path="/test" element={<TestPage />} />
                    
                    {/* Navigation & Info Routes */}
                    <Route path="/about" element={<About />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogArticle />} />
                    <Route path="/careers" element={<Careers />} />
                    
                    {/* Legal Routes */}
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/legal" element={<Legal />} />
                    
                    {/* Authentication Routes */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    
                    {/* Industry Routes */}
                    <Route path="/industry-dashboard" element={<IndustryDashboard />} />
                    <Route path="/industry-requirements" element={<IndustryRequirements />} />
                    <Route path="/industry-workflows" element={<IndustryWorkflows />} />
                    <Route path="/industry-stakeholders" element={<IndustryStakeholders />} />
                    <Route path="/industry-messages" element={<IndustryMessages />} />
                    <Route path="/industry-profile" element={<IndustryProfile />} />
                    <Route path="/industry-documents" element={<IndustryDocuments />} />
                    <Route path="/industry-project-workflow/:id" element={<IndustryProjectWorkflow />} />
                    
                    {/* Professional/Expert Routes */}
                    <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
                    <Route path="/professional-profile" element={<ProfessionalProfile />} />
                    <Route path="/professional-calendar" element={<ProfessionalCalendar />} />
                    <Route path="/professional-messages" element={<ProfessionalMessages />} />
                    <Route path="/professional-opportunities" element={<ProfessionalOpportunities />} />
                    <Route path="/professional-details/:id" element={<ProfessionalDetails />} />
                    <Route path="/expert-dashboard" element={<ExpertDashboard />} />
                    <Route path="/experts" element={<Experts />} />
                    
                    {/* Service Vendor Routes */}
                    <Route path="/service-vendor-dashboard" element={<ServiceVendorDashboard />} />
                    <Route path="/service-vendor-profile" element={<ServiceVendorProfile />} />
                    <Route path="/service-vendor-messages" element={<ServiceVendorMessages />} />
                    <Route path="/service-vendor-projects" element={<ServiceVendorProjects />} />
                    <Route path="/service-vendor-rfqs" element={<ServiceVendorRFQs />} />
                    <Route path="/service-vendor-services" element={<ServiceVendorServices />} />
                    
                    {/* Product Vendor Routes */}
                    <Route path="/product-vendor-dashboard" element={<ProductVendorDashboard />} />
                    <Route path="/product-vendor-profile" element={<ProductVendorProfile />} />
                    <Route path="/product-vendor-catalog" element={<ProductVendorCatalog />} />
                    <Route path="/product-vendor-messages" element={<ProductVendorMessages />} />
                    <Route path="/product-vendor-orders" element={<ProductVendorOrders />} />
                    <Route path="/product-vendor-rfqs" element={<ProductVendorRFQs />} />
                    
                    {/* Logistics Vendor Routes */}
                    <Route path="/logistics-vendor-dashboard" element={<LogisticsVendorDashboard />} />
                    <Route path="/logistics-vendor-profile" element={<LogisticsVendorProfile />} />
                    <Route path="/logistics-vendor-deliveries" element={<LogisticsVendorDeliveries />} />
                    <Route path="/logistics-vendor-fleet" element={<LogisticsVendorFleet />} />
                    <Route path="/logistics-vendor-messages" element={<LogisticsVendorMessages />} />
                    <Route path="/logistics-vendor-requests" element={<LogisticsVendorRequests />} />
                    
                    {/* Vendor Management Routes */}
                    <Route path="/vendors" element={<Vendors />} />
                    <Route path="/vendor-details/:id" element={<VendorDetails />} />
                    <Route path="/vendor-profile" element={<VendorProfile />} />
                    
                    {/* Requirement & Purchase Order Management */}
                    <Route path="/create-requirement" element={<CreateRequirement />} />
                    <Route path="/requirement/:id" element={<RequirementDetails />} />
                    <Route path="/create-purchase-order" element={<CreatePurchaseOrder />} />
                    <Route path="/work-completion-payment/:id" element={<WorkCompletionPayment />} />
                    
                    {/* Profile & Onboarding Routes */}
                    <Route path="/profile-completion" element={<ProfileCompletion />} />
                    <Route path="/stakeholder-onboarding" element={<StakeholderOnboarding />} />
                    
                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Toaster />
              </NotificationStoreProvider>
            </VendorSpecializationProvider>
          </UserProvider>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
