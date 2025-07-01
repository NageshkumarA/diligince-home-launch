
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from '@/contexts/UserContext';
import { NotificationStoreProvider } from '@/contexts/NotificationStoreContext';
import { EnhancedApprovalProvider } from '@/contexts/EnhancedApprovalContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { RequirementProvider } from '@/contexts/RequirementContext';
import { ApprovalProvider } from '@/contexts/ApprovalContext';
import { StakeholderProvider } from '@/contexts/StakeholderContext';
import { VendorSpecializationProvider } from '@/contexts/VendorSpecializationContext';
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from '@/components/ErrorBoundary';
import RouteErrorBoundary from '@/components/RouteErrorBoundary';

import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Pricing from '@/pages/Pricing';
import Blog from '@/pages/Blog';
import Careers from '@/pages/Careers';
import Legal from '@/pages/Legal';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import NotFound from '@/pages/NotFound';
import ProfileCompletion from '@/pages/ProfileCompletion';
import TestPage from '@/pages/TestPage';
import BlogArticle from '@/pages/BlogArticle';
import StakeholderOnboarding from '@/pages/StakeholderOnboarding';
import PendingApproval from '@/pages/PendingApproval';
import WorkCompletionPayment from '@/pages/WorkCompletionPayment';

// Industry pages
import IndustryDashboard from '@/pages/IndustryDashboard';
import IndustryProfile from '@/pages/IndustryProfile';
import IndustryRequirements from '@/pages/IndustryRequirements';
import IndustryWorkflows from '@/pages/IndustryWorkflows';
import IndustryProjectWorkflow from '@/pages/IndustryProjectWorkflow';
import IndustryStakeholders from '@/pages/IndustryStakeholders';
import IndustryDocuments from '@/pages/IndustryDocuments';
import IndustryMessages from '@/pages/IndustryMessages';
import IndustryApprovalMatrix from '@/pages/IndustryApprovalMatrix';
import CreateRequirement from '@/pages/CreateRequirement';
import CreatePurchaseOrder from '@/pages/CreatePurchaseOrder';

// Vendor pages
import ServiceVendorDashboard from '@/pages/ServiceVendorDashboard';
import ProductVendorDashboard from '@/pages/ProductVendorDashboard';
import LogisticsVendorDashboard from '@/pages/LogisticsVendorDashboard';

// Professional pages
import ProfessionalDashboard from '@/pages/ProfessionalDashboard';
import ProfessionalOpportunities from '@/pages/ProfessionalOpportunities';
import ProfessionalCalendar from '@/pages/ProfessionalCalendar';
import ProfessionalMessages from '@/pages/ProfessionalMessages';
import ProfessionalProfile from '@/pages/ProfessionalProfile';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <UserProvider>
          <NotificationStoreProvider>
            <NotificationProvider>
              <EnhancedApprovalProvider>
                <RequirementProvider>
                  <ApprovalProvider>
                    <StakeholderProvider>
                      <VendorSpecializationProvider>
                        <div className="App">
                          <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<RouteErrorBoundary><Index /></RouteErrorBoundary>} />
                            <Route path="/about" element={<RouteErrorBoundary><About /></RouteErrorBoundary>} />
                            <Route path="/contact" element={<RouteErrorBoundary><Contact /></RouteErrorBoundary>} />
                            <Route path="/pricing" element={<RouteErrorBoundary><Pricing /></RouteErrorBoundary>} />
                            <Route path="/blog" element={<RouteErrorBoundary><Blog /></RouteErrorBoundary>} />
                            <Route path="/blog/:slug" element={<RouteErrorBoundary><BlogArticle /></RouteErrorBoundary>} />
                            <Route path="/careers" element={<RouteErrorBoundary><Careers /></RouteErrorBoundary>} />
                            <Route path="/legal" element={<RouteErrorBoundary><Legal /></RouteErrorBoundary>} />
                            <Route path="/privacy" element={<RouteErrorBoundary><Privacy /></RouteErrorBoundary>} />
                            <Route path="/terms" element={<RouteErrorBoundary><Terms /></RouteErrorBoundary>} />
                            
                            {/* Auth Routes */}
                            <Route path="/signup" element={<RouteErrorBoundary><SignUp /></RouteErrorBoundary>} />
                            <Route path="/signin" element={<RouteErrorBoundary><SignIn /></RouteErrorBoundary>} />
                            <Route path="/forgot-password" element={<RouteErrorBoundary><ForgotPassword /></RouteErrorBoundary>} />
                            <Route path="/reset-password" element={<RouteErrorBoundary><ResetPassword /></RouteErrorBoundary>} />
                            <Route path="/pending-approval" element={<RouteErrorBoundary><PendingApproval /></RouteErrorBoundary>} />
                            
                            {/* Profile and Onboarding */}
                            <Route path="/profile-completion" element={<RouteErrorBoundary><ProfileCompletion /></RouteErrorBoundary>} />
                            <Route path="/stakeholder-onboarding/:token" element={<RouteErrorBoundary><StakeholderOnboarding /></RouteErrorBoundary>} />
                            
                            {/* Industry Routes */}
                            <Route path="/industry-dashboard" element={<RouteErrorBoundary><IndustryDashboard /></RouteErrorBoundary>} />
                            <Route path="/industry-profile" element={<RouteErrorBoundary><IndustryProfile /></RouteErrorBoundary>} />
                            <Route path="/industry-requirements" element={<RouteErrorBoundary><IndustryRequirements /></RouteErrorBoundary>} />
                            <Route path="/create-requirement" element={<RouteErrorBoundary><CreateRequirement /></RouteErrorBoundary>} />
                            <Route path="/create-purchase-order" element={<RouteErrorBoundary><CreatePurchaseOrder /></RouteErrorBoundary>} />
                            <Route path="/industry-workflows" element={<RouteErrorBoundary><IndustryWorkflows /></RouteErrorBoundary>} />
                            <Route path="/industry-project-workflow/:id" element={<RouteErrorBoundary><IndustryProjectWorkflow /></RouteErrorBoundary>} />
                            <Route path="/industry-stakeholders" element={<RouteErrorBoundary><IndustryStakeholders /></RouteErrorBoundary>} />
                            <Route path="/industry-documents" element={<RouteErrorBoundary><IndustryDocuments /></RouteErrorBoundary>} />
                            <Route path="/industry-messages" element={<RouteErrorBoundary><IndustryMessages /></RouteErrorBoundary>} />
                            <Route path="/industry-approval-matrix" element={<RouteErrorBoundary><IndustryApprovalMatrix /></RouteErrorBoundary>} />
                            <Route path="/work-completion-payment/:id" element={<RouteErrorBoundary><WorkCompletionPayment /></RouteErrorBoundary>} />

                            {/* Vendor Routes */}
                            <Route path="/service-vendor-dashboard" element={<RouteErrorBoundary><ServiceVendorDashboard /></RouteErrorBoundary>} />
                            <Route path="/product-vendor-dashboard" element={<RouteErrorBoundary><ProductVendorDashboard /></RouteErrorBoundary>} />
                            <Route path="/logistics-vendor-dashboard" element={<RouteErrorBoundary><LogisticsVendorDashboard /></RouteErrorBoundary>} />

                            {/* Professional Routes */}
                            <Route path="/professional-dashboard" element={<RouteErrorBoundary><ProfessionalDashboard /></RouteErrorBoundary>} />
                            <Route path="/professional-opportunities" element={<RouteErrorBoundary><ProfessionalOpportunities /></RouteErrorBoundary>} />
                            <Route path="/professional-calendar" element={<RouteErrorBoundary><ProfessionalCalendar /></RouteErrorBoundary>} />
                            <Route path="/professional-messages" element={<RouteErrorBoundary><ProfessionalMessages /></RouteErrorBoundary>} />
                            <Route path="/professional-profile" element={<RouteErrorBoundary><ProfessionalProfile /></RouteErrorBoundary>} />
                            
                            {/* Test and 404 */}
                            <Route path="/test" element={<RouteErrorBoundary><TestPage /></RouteErrorBoundary>} />
                            <Route path="*" element={<RouteErrorBoundary><NotFound /></RouteErrorBoundary>} />
                          </Routes>
                          <Toaster />
                        </div>
                      </VendorSpecializationProvider>
                    </StakeholderProvider>
                  </ApprovalProvider>
                </RequirementProvider>
              </EnhancedApprovalProvider>
            </NotificationProvider>
          </NotificationStoreProvider>
        </UserProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
