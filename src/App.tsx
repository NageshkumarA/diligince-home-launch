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
import Layout from '@/components/Layout';

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

// Settings components
import { SettingsLayout } from '@/components/settings/SettingsLayout';
import SettingsPersonal from '@/pages/settings/SettingsPersonal';
import SettingsMembers from '@/pages/settings/SettingsMembers';
import SettingsPayments from '@/pages/settings/SettingsPayments';
import SettingsWorkflows from '@/pages/settings/SettingsWorkflows';
import SettingsData from '@/pages/settings/SettingsData';
import SettingsNotifications from '@/pages/settings/SettingsNotifications';
import SettingsPrivacy from '@/pages/settings/SettingsPrivacy';

// Industry pages
import IndustryDashboard from '@/pages/IndustryDashboard';
import IndustryProfile from '@/pages/IndustryProfile';
import IndustryRequirements from '@/pages/IndustryRequirements';
import IndustryApprovals from '@/pages/IndustryApprovals';
import IndustryPurchaseOrders from '@/pages/IndustryPurchaseOrders';
import IndustryQuotes from '@/pages/IndustryQuotes';
import IndustryReports from '@/pages/IndustryReports';
import IndustrySettings from '@/pages/IndustrySettings';
import IndustryWorkflows from '@/pages/IndustryWorkflows';
import IndustryProjectWorkflow from '@/pages/IndustryProjectWorkflow';
import IndustryStakeholders from '@/pages/IndustryStakeholders';
import IndustryDocuments from '@/pages/IndustryDocuments';
import IndustryMessages from '@/pages/IndustryMessages';
import IndustryApprovalMatrix from '@/pages/IndustryApprovalMatrix';
import IndustryAnalytics from '@/pages/IndustryAnalytics';
import IndustryTeam from '@/pages/IndustryTeam';
import IndustryNotifications from '@/pages/IndustryNotifications';
import CreateRequirement from '@/pages/CreateRequirement';
import CreatePurchaseOrder from '@/pages/CreatePurchaseOrder';
import RoleManagement from '@/pages/RoleManagement';

// Requirements sub-pages
import RequirementsDrafts from '@/pages/RequirementsDrafts';
import RequirementsPending from '@/pages/RequirementsPending';
import RequirementsApproved from '@/pages/RequirementsApproved';
import RequirementsPublished from '@/pages/RequirementsPublished';
import RequirementsArchived from '@/pages/RequirementsArchived';

// Quotations sub-pages
import QuotationsPending from '@/pages/QuotationsPending';
import QuotationsApproved from '@/pages/QuotationsApproved';
import QuotationsComparison from '@/pages/QuotationsComparison';

// Purchase Orders sub-pages
import PurchaseOrdersPending from '@/pages/PurchaseOrdersPending';
import PurchaseOrdersInProgress from '@/pages/PurchaseOrdersInProgress';
import PurchaseOrdersCompleted from '@/pages/PurchaseOrdersCompleted';

// Professional sub-pages
import OpportunitiesSaved from '@/pages/OpportunitiesSaved';
import OpportunitiesApplications from '@/pages/OpportunitiesApplications';
import ProjectsActive from '@/pages/ProjectsActive';

// Vendor sub-pages
import VendorRFQsBrowse from '@/pages/VendorRFQsBrowse';

// Workflow sub-pages
import WorkflowsActive from '@/pages/WorkflowsActive';

// Stakeholder sub-pages
import StakeholdersVendors from '@/pages/StakeholdersVendors';
import StakeholdersProfessionals from '@/pages/StakeholdersProfessionals';

// Vendor pages
import ServiceVendorDashboard from '@/pages/ServiceVendorDashboard';
import ProductVendorDashboard from '@/pages/ProductVendorDashboard';
import LogisticsVendorDashboard from '@/pages/LogisticsVendorDashboard';

// Service Vendor pages
import ServiceVendorRFQs from '@/pages/ServiceVendorRFQs';
import ServiceVendorProjects from '@/pages/ServiceVendorProjects';
import ServiceVendorMessages from '@/pages/ServiceVendorMessages';
import ServiceVendorProfile from '@/pages/ServiceVendorProfile';
import ServiceVendorServices from '@/pages/ServiceVendorServices';

// Product Vendor pages
import ProductVendorRFQs from '@/pages/ProductVendorRFQs';
import ProductVendorOrders from '@/pages/ProductVendorOrders';
import ProductVendorCatalog from '@/pages/ProductVendorCatalog';
import ProductVendorMessages from '@/pages/ProductVendorMessages';
import ProductVendorProfile from '@/pages/ProductVendorProfile';

// Logistics Vendor pages
import LogisticsVendorRequests from '@/pages/LogisticsVendorRequests';
import LogisticsVendorDeliveries from '@/pages/LogisticsVendorDeliveries';
import LogisticsVendorFleet from '@/pages/LogisticsVendorFleet';
import LogisticsVendorMessages from '@/pages/LogisticsVendorMessages';
import LogisticsVendorProfile from '@/pages/LogisticsVendorProfile';

// Professional pages
import ProfessionalDashboard from '@/pages/ProfessionalDashboard';
import ProfessionalOpportunities from '@/pages/ProfessionalOpportunities';
import ProfessionalCalendar from '@/pages/ProfessionalCalendar';
import ProfessionalMessages from '@/pages/ProfessionalMessages';
import ProfessionalProfile from '@/pages/ProfessionalProfile';
import ProfessionalPortfolio from '@/pages/ProfessionalPortfolio';
import ProfessionalCertifications from '@/pages/ProfessionalCertifications';

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
                            {/* Public Routes - No Layout */}
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
                            
                            {/* Auth Routes - No Layout */}
                            <Route path="/signup" element={<RouteErrorBoundary><SignUp /></RouteErrorBoundary>} />
                            <Route path="/signin" element={<RouteErrorBoundary><SignIn /></RouteErrorBoundary>} />
                            <Route path="/forgot-password" element={<RouteErrorBoundary><ForgotPassword /></RouteErrorBoundary>} />
                            <Route path="/reset-password" element={<RouteErrorBoundary><ResetPassword /></RouteErrorBoundary>} />
                            <Route path="/pending-approval" element={<RouteErrorBoundary><PendingApproval /></RouteErrorBoundary>} />
                            
                            {/* Profile and Onboarding - No Layout */}
                            <Route path="/profile-completion" element={<RouteErrorBoundary><ProfileCompletion /></RouteErrorBoundary>} />
                            <Route path="/stakeholder-onboarding/:token" element={<RouteErrorBoundary><StakeholderOnboarding /></RouteErrorBoundary>} />

                            {/* Authenticated Routes - With Layout */}
                            <Route path="/dashboard/*" element={<Layout />}>
                              {/* Industry Routes */}
                              <Route path="industry" element={<RouteErrorBoundary><IndustryDashboard /></RouteErrorBoundary>} />
                              <Route path="industry-profile" element={<RouteErrorBoundary><IndustryProfile /></RouteErrorBoundary>} />
                              <Route path="industry-requirements" element={<RouteErrorBoundary><IndustryRequirements /></RouteErrorBoundary>} />
                              <Route path="industry-approvals" element={<RouteErrorBoundary><IndustryApprovals /></RouteErrorBoundary>} />
                              <Route path="industry-purchase-orders" element={<RouteErrorBoundary><IndustryPurchaseOrders /></RouteErrorBoundary>} />
                              <Route path="industry-quotes" element={<RouteErrorBoundary><IndustryQuotes /></RouteErrorBoundary>} />
                              <Route path="industry-reports" element={<RouteErrorBoundary><IndustryReports /></RouteErrorBoundary>} />
                              <Route path="industry-settings" element={<RouteErrorBoundary><IndustrySettings /></RouteErrorBoundary>} />
                              <Route path="create-requirement" element={<RouteErrorBoundary><CreateRequirement /></RouteErrorBoundary>} />
                              <Route path="create-purchase-order" element={<RouteErrorBoundary><CreatePurchaseOrder /></RouteErrorBoundary>} />
                              <Route path="industry-workflows" element={<RouteErrorBoundary><IndustryWorkflows /></RouteErrorBoundary>} />
                              <Route path="industry-project-workflow/:id" element={<RouteErrorBoundary><IndustryProjectWorkflow /></RouteErrorBoundary>} />
                              <Route path="industry-stakeholders" element={<RouteErrorBoundary><IndustryStakeholders /></RouteErrorBoundary>} />
                              <Route path="industry-documents" element={<RouteErrorBoundary><IndustryDocuments /></RouteErrorBoundary>} />
                              <Route path="industry-messages" element={<RouteErrorBoundary><IndustryMessages /></RouteErrorBoundary>} />
                              <Route path="industry-approval-matrix" element={<RouteErrorBoundary><IndustryApprovalMatrix /></RouteErrorBoundary>} />
                              <Route path="industry-analytics" element={<RouteErrorBoundary><IndustryAnalytics /></RouteErrorBoundary>} />
                              <Route path="industry-team" element={<RouteErrorBoundary><IndustryTeam /></RouteErrorBoundary>} />
                              <Route path="industry-notifications" element={<RouteErrorBoundary><IndustryNotifications /></RouteErrorBoundary>} />
                              <Route path="role-management" element={<RouteErrorBoundary><RoleManagement /></RouteErrorBoundary>} />
                              
                              {/* Requirements Sub-routes */}
                              <Route path="requirements/drafts" element={<RouteErrorBoundary><RequirementsDrafts /></RouteErrorBoundary>} />
                              <Route path="requirements/pending" element={<RouteErrorBoundary><RequirementsPending /></RouteErrorBoundary>} />
                              <Route path="requirements/approved" element={<RouteErrorBoundary><RequirementsApproved /></RouteErrorBoundary>} />
                              <Route path="requirements/published" element={<RouteErrorBoundary><RequirementsPublished /></RouteErrorBoundary>} />
                              <Route path="requirements/archived" element={<RouteErrorBoundary><RequirementsArchived /></RouteErrorBoundary>} />
                              
                              {/* Quotations Sub-routes */}
                              <Route path="quotations/pending" element={<RouteErrorBoundary><QuotationsPending /></RouteErrorBoundary>} />
                              <Route path="quotations/approved" element={<RouteErrorBoundary><QuotationsApproved /></RouteErrorBoundary>} />
                              <Route path="quotations/comparison" element={<RouteErrorBoundary><QuotationsComparison /></RouteErrorBoundary>} />
                              
                              {/* Purchase Orders Sub-routes */}
                              <Route path="purchase-orders/pending" element={<RouteErrorBoundary><PurchaseOrdersPending /></RouteErrorBoundary>} />
                              <Route path="purchase-orders/in-progress" element={<RouteErrorBoundary><PurchaseOrdersInProgress /></RouteErrorBoundary>} />
                              <Route path="purchase-orders/completed" element={<RouteErrorBoundary><PurchaseOrdersCompleted /></RouteErrorBoundary>} />

                              {/* Workflow Sub-routes */}
                              <Route path="workflows/active" element={<RouteErrorBoundary><WorkflowsActive /></RouteErrorBoundary>} />

                              {/* Stakeholder Sub-routes */}
                              <Route path="stakeholders/vendors" element={<RouteErrorBoundary><StakeholdersVendors /></RouteErrorBoundary>} />
                              <Route path="stakeholders/professionals" element={<RouteErrorBoundary><StakeholdersProfessionals /></RouteErrorBoundary>} />

                              {/* Vendor Routes */}
                              <Route path="service-vendor" element={<RouteErrorBoundary><ServiceVendorDashboard /></RouteErrorBoundary>} />
                              <Route path="product-vendor" element={<RouteErrorBoundary><ProductVendorDashboard /></RouteErrorBoundary>} />
                              <Route path="logistics-vendor" element={<RouteErrorBoundary><LogisticsVendorDashboard /></RouteErrorBoundary>} />

                              {/* Service Vendor Routes */}
                              <Route path="service-vendor-rfqs" element={<RouteErrorBoundary><ServiceVendorRFQs /></RouteErrorBoundary>} />
                              <Route path="service-vendor-projects" element={<RouteErrorBoundary><ServiceVendorProjects /></RouteErrorBoundary>} />
                              <Route path="service-vendor-messages" element={<RouteErrorBoundary><ServiceVendorMessages /></RouteErrorBoundary>} />
                              <Route path="service-vendor-profile" element={<RouteErrorBoundary><ServiceVendorProfile /></RouteErrorBoundary>} />
                              <Route path="service-vendor-services" element={<RouteErrorBoundary><ServiceVendorServices /></RouteErrorBoundary>} />

                              {/* Product Vendor Routes */}
                              <Route path="product-vendor-rfqs" element={<RouteErrorBoundary><ProductVendorRFQs /></RouteErrorBoundary>} />
                              <Route path="product-vendor-orders" element={<RouteErrorBoundary><ProductVendorOrders /></RouteErrorBoundary>} />
                              <Route path="product-vendor-catalog" element={<RouteErrorBoundary><ProductVendorCatalog /></RouteErrorBoundary>} />
                              <Route path="product-vendor-messages" element={<RouteErrorBoundary><ProductVendorMessages /></RouteErrorBoundary>} />
                              <Route path="product-vendor-profile" element={<RouteErrorBoundary><ProductVendorProfile /></RouteErrorBoundary>} />

                              {/* Logistics Vendor Routes */}
                              <Route path="logistics-vendor-requests" element={<RouteErrorBoundary><LogisticsVendorRequests /></RouteErrorBoundary>} />
                              <Route path="logistics-vendor-deliveries" element={<RouteErrorBoundary><LogisticsVendorDeliveries /></RouteErrorBoundary>} />
                              <Route path="logistics-vendor-fleet" element={<RouteErrorBoundary><LogisticsVendorFleet /></RouteErrorBoundary>} />
                              <Route path="logistics-vendor-messages" element={<RouteErrorBoundary><LogisticsVendorMessages /></RouteErrorBoundary>} />
                              <Route path="logistics-vendor-profile" element={<RouteErrorBoundary><LogisticsVendorProfile /></RouteErrorBoundary>} />

                              {/* Professional Routes */}
                              <Route path="professional" element={<RouteErrorBoundary><ProfessionalDashboard /></RouteErrorBoundary>} />
                              <Route path="professional-opportunities" element={<RouteErrorBoundary><ProfessionalOpportunities /></RouteErrorBoundary>} />
                              <Route path="professional-calendar" element={<RouteErrorBoundary><ProfessionalCalendar /></RouteErrorBoundary>} />
                              <Route path="professional-messages" element={<RouteErrorBoundary><ProfessionalMessages /></RouteErrorBoundary>} />
                              <Route path="professional-profile" element={<RouteErrorBoundary><ProfessionalProfile /></RouteErrorBoundary>} />
                              <Route path="professional-portfolio" element={<RouteErrorBoundary><ProfessionalPortfolio /></RouteErrorBoundary>} />
                              <Route path="professional-certifications" element={<RouteErrorBoundary><ProfessionalCertifications /></RouteErrorBoundary>} />

                              {/* Professional Sub-routes */}
                              <Route path="opportunities/saved" element={<RouteErrorBoundary><OpportunitiesSaved /></RouteErrorBoundary>} />
                              <Route path="opportunities/applications" element={<RouteErrorBoundary><OpportunitiesApplications /></RouteErrorBoundary>} />
                              <Route path="projects/active" element={<RouteErrorBoundary><ProjectsActive /></RouteErrorBoundary>} />

                               {/* Vendor Sub-routes */}
                               <Route path="rfqs/browse" element={<RouteErrorBoundary><VendorRFQsBrowse /></RouteErrorBoundary>} />
                               
                               {/* Settings Routes */}
                               <Route path="settings" element={<SettingsLayout />}>
                                 <Route path="personal" element={<RouteErrorBoundary><SettingsPersonal /></RouteErrorBoundary>} />
                                 <Route path="members" element={<RouteErrorBoundary><SettingsMembers /></RouteErrorBoundary>} />
                                 <Route path="payments" element={<RouteErrorBoundary><SettingsPayments /></RouteErrorBoundary>} />
                                 <Route path="workflows" element={<RouteErrorBoundary><SettingsWorkflows /></RouteErrorBoundary>} />
                                 <Route path="data" element={<RouteErrorBoundary><SettingsData /></RouteErrorBoundary>} />
                                 <Route path="notifications" element={<RouteErrorBoundary><SettingsNotifications /></RouteErrorBoundary>} />
                                 <Route path="privacy" element={<RouteErrorBoundary><SettingsPrivacy /></RouteErrorBoundary>} />
                               </Route>
                               
                               {/* Test */}
                               <Route path="test" element={<RouteErrorBoundary><TestPage /></RouteErrorBoundary>} />
                               <Route path="work-completion-payment" element={<RouteErrorBoundary><WorkCompletionPayment /></RouteErrorBoundary>} />
                            </Route>
                            
                            {/* Standalone authenticated routes for legacy paths */}
                            <Route path="/industry-dashboard" element={<Layout />}>
                              <Route index element={<RouteErrorBoundary><IndustryDashboard /></RouteErrorBoundary>} />
                            </Route>
                            
                            <Route path="/service-vendor-dashboard" element={<Layout />}>
                              <Route index element={<RouteErrorBoundary><ServiceVendorDashboard /></RouteErrorBoundary>} />
                            </Route>
                            
                            <Route path="/product-vendor-dashboard" element={<Layout />}>
                              <Route index element={<RouteErrorBoundary><ProductVendorDashboard /></RouteErrorBoundary>} />
                            </Route>
                            
                            <Route path="/logistics-vendor-dashboard" element={<Layout />}>
                              <Route index element={<RouteErrorBoundary><LogisticsVendorDashboard /></RouteErrorBoundary>} />
                            </Route>
                            
                            <Route path="/professional-dashboard" element={<Layout />}>
                              <Route index element={<RouteErrorBoundary><ProfessionalDashboard /></RouteErrorBoundary>} />
                            </Route>
                            
                            {/* 404 Route */}
                            <Route path="*" element={<NotFound />} />
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