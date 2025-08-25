# Diligence.ai Frontend Analysis Document
## Complete Technical Specification for Backend Development

---

## Table of Contents
1. [Project Overview & Architecture](#project-overview--architecture)
2. [User Type Analysis](#user-type-analysis)
3. [Cross-Cutting Concerns](#cross-cutting-concerns)
4. [Backend API Requirements](#backend-api-requirements)
5. [Data Models & Relationships](#data-models--relationships)
6. [Authentication & Authorization](#authentication--authorization)
7. [Integration Requirements](#integration-requirements)
8. [Public Pages & Marketing](#public-pages--marketing)
9. [Admin & Management Features](#admin--management-features)
10. [Performance & Security](#performance--security)

---

## Project Overview & Architecture

### Technology Stack
- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **UI Library**: Radix UI components with shadcn/ui
- **Form Management**: React Hook Form with Zod validation
- **Routing**: React Router DOM v6
- **State Management**: React Context API + Custom Hooks
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **Date Handling**: date-fns
- **Query Management**: TanStack React Query
- **Phone Validation**: libphonenumber-js
- **Error Handling**: React Error Boundary
- **Theme Management**: Next Themes with system preference detection
- **SEO**: React Helmet

### Project Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Route components
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── lib/               # Library configurations
└── assets/            # Static assets and images
```

### Key Architecture Patterns
- **Component Composition**: Modular, reusable components
- **Custom Hooks**: Business logic separation
- **Context-based State**: Global state management
- **Type Safety**: Comprehensive TypeScript usage
- **Form Validation**: Zod schemas with React Hook Form
- **Error Boundaries**: Robust error handling
- **Performance Optimization**: Code splitting, lazy loading
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA compliant components

---

## User Type Analysis

## 1. Industry Users (Manufacturing Companies)

### Pages
- **IndustryDashboard** (`/industry-dashboard`)
  - Purpose: Main control center for manufacturing operations
  - Features: KPI metrics, workflow tracking, quick actions, project overview
  
- **CreateRequirement** (`/create-requirement`)
  - Purpose: Multi-step requirement creation process
  - Features: 6-step wizard, document upload, approval workflow, ISO compliance
  
- **IndustryRequirements** (`/industry-requirements`)
  - Purpose: Manage all requirements and RFQs
  - Features: Filtering, status tracking, bulk operations, search functionality
  
- **CreatePurchaseOrder** (`/create-purchase-order`)
  - Purpose: Purchase order creation and management
  - Features: ISO compliance, vendor selection, workflow integration, multi-step process
  
- **IndustryProjectWorkflow** (`/industry-project-workflow/:id`)
  - Purpose: Project tracking and milestone management
  - Features: Timeline view, payment tracking, vendor communication, deliverable tracking
  
- **IndustryStakeholders** (`/industry-stakeholders`)
  - Purpose: Vendor and expert management
  - Features: Stakeholder profiles, performance tracking, communication tools
  
- **IndustryApprovalMatrix** (`/industry-approval-matrix`)
  - Purpose: Configure approval workflows
  - Features: Matrix configuration, role-based approvals, workflow automation
  
- **IndustryProfile** (`/industry-profile`)
  - Purpose: Company profile and settings management
  - Features: Company information, team management, system configuration

- **IndustryDocuments** (`/industry-documents`)
  - Purpose: Document management system
  - Features: File upload, version control, document sharing, access control

- **IndustryMessages** (`/industry-messages`)
  - Purpose: Communication hub
  - Features: Message threads, vendor communication, expert consultation

- **IndustryWorkflows** (`/industry-workflows`)
  - Purpose: Workflow management and tracking
  - Features: Workflow templates, status tracking, automation rules

- **WorkCompletionPayment** (`/work-completion-payment`)
  - Purpose: Payment processing for completed work
  - Features: Payment verification, milestone completion, invoice generation

- **RequirementDetails** (`/requirement/:id`)
  - Purpose: Detailed view of specific requirements
  - Features: Full requirement details, status tracking, communication history

### Key Components
- **IndustryHeader**: Navigation and user controls with role-based menu items
- **RequirementStepIndicator**: Multi-step process visualization with progress tracking
- **POReviewStep**: Purchase order review and approval with compliance checks
- **WorkTimeline**: Project progress visualization with milestone markers
- **QuoteComparisonCard**: Vendor quote analysis with side-by-side comparison
- **PaymentMilestoneTracker**: Financial milestone tracking with payment status
- **ISO9001TermsSection**: Compliance management and documentation
- **ApprovalMatrixConfiguration**: Workflow setup with drag-and-drop interface
- **EnterpriseTeamMembers**: Team management with role assignments
- **AIEvaluationPanel**: AI-powered quote evaluation and recommendations
- **QuoteReviewTable**: Tabular view of vendor quotes with filtering
- **QuoteStatusTracker**: Real-time quote status updates
- **RetentionPaymentCard**: Payment retention management
- **POTriggerCard**: Purchase order trigger mechanisms

### Modals
- **SendRFQModal**: RFQ distribution to stakeholders with batch operations
- **AddVendorModal**: Vendor onboarding and selection with verification
- **AddExpertModal**: Expert consultant addition with skill matching
- **PODetailsModal**: Purchase order details view with edit capabilities
- **QuickPOModal**: Rapid purchase order creation with templates
- **POTypeSelectionModal**: Purchase order type selection with recommendations
- **ManualPOUploadModal**: Manual PO document upload with validation

### Contexts
- **RequirementContext**: Requirement state management with CRUD operations
- **ApprovalContext**: Approval workflow management with role-based permissions
- **EnhancedApprovalContext**: Advanced multi-level approval workflows
- **StakeholderContext**: Stakeholder data management with relationship tracking

### Types
- **industry.ts**: Core industry data structures and interfaces
- **approval.ts**: Approval workflow types and status enums
- **enhancedApproval.ts**: Complex approval workflow types
- **workflow.ts**: Project workflow types and milestone definitions
- **rfq.ts**: RFQ and quote management types with vendor responses
- **purchaseOrder.ts**: Purchase order structures with compliance requirements

### Hooks
- **useAsyncOperation**: Async operation management with loading states
- **useNotifications**: Toast notification system with custom styling
- **usePagination**: Data pagination with server-side support
- **useSearch**: Search functionality with debouncing and filters
- **useModal**: Modal state management with backdrop controls

### Utils
- **statusUtils**: Status badge and color management with theme integration
- **dateUtils**: Date formatting and calculations with timezone support
- **profileCompleteness**: Profile completion tracking with weighted scoring
- **colorUtils**: Color and theme utilities with HSL color system
- **dashboardConfigs**: Dashboard configuration for different user types
- **messageConfigs**: Message system configuration per user type
- **navigationConfigs**: Navigation configuration for headers and menus
- **performance**: Performance optimization utilities
- **mockNotifications**: Mock data for notification testing

### API Requirements
```typescript
// Requirements Management
POST /api/industry/requirements
GET /api/industry/requirements
PUT /api/industry/requirements/:id
DELETE /api/industry/requirements/:id
POST /api/industry/requirements/:id/approve
GET /api/industry/requirements/:id/history

// RFQ Distribution
POST /api/industry/rfqs
GET /api/industry/rfqs
POST /api/industry/rfqs/:id/send
GET /api/industry/rfqs/:id/responses
POST /api/industry/rfqs/:id/evaluate

// Purchase Orders
POST /api/industry/purchase-orders
GET /api/industry/purchase-orders
PUT /api/industry/purchase-orders/:id
POST /api/industry/purchase-orders/:id/approve
GET /api/industry/purchase-orders/:id/compliance-check

// Workflows
GET /api/industry/workflows
POST /api/industry/workflows/:id/update-status
GET /api/industry/workflows/:id/timeline
POST /api/industry/workflows/templates

// Stakeholders
GET /api/industry/stakeholders
POST /api/industry/stakeholders/invite
PUT /api/industry/stakeholders/:id
DELETE /api/industry/stakeholders/:id
GET /api/industry/stakeholders/:id/performance

// Approval Matrix
GET /api/industry/approval-matrix
PUT /api/industry/approval-matrix
POST /api/industry/approval-matrix/workflows
GET /api/industry/approval-matrix/templates

// Documents
POST /api/industry/documents/upload
GET /api/industry/documents
PUT /api/industry/documents/:id
DELETE /api/industry/documents/:id
GET /api/industry/documents/:id/versions

// Messages
GET /api/industry/messages
POST /api/industry/messages
PUT /api/industry/messages/:id/read
GET /api/industry/messages/threads
```

---

## 2. Professional Experts (Consultants/Specialists)

### Pages
- **ProfessionalDashboard** (`/professional-dashboard`)
  - Purpose: Personal dashboard for consultants
  - Features: Job opportunities, project status, earnings tracking, performance metrics
  
- **ProfessionalOpportunities** (`/professional-opportunities`)
  - Purpose: Browse and apply for consulting opportunities
  - Features: Job search, application management, proposal creation, skill matching
  
- **ProfessionalCalendar** (`/professional-calendar`)
  - Purpose: Availability and schedule management
  - Features: Calendar integration, availability slots, booking management, time zone support
  
- **ProfessionalProfile** (`/professional-profile`)
  - Purpose: Professional profile management
  - Features: Skills, certifications, portfolio, rates, availability settings

- **ProfessionalMessages** (`/professional-messages`)
  - Purpose: Communication with clients and platform
  - Features: Message threads, client communication, project discussions

- **ProfessionalDetails** (`/professional/:id`)
  - Purpose: Public profile view for professionals
  - Features: Skills showcase, portfolio, reviews, availability

- **ExpertDashboard** (`/expert-dashboard`)
  - Purpose: Alternative dashboard for expert consultants
  - Features: Specialized metrics, expert-level projects, consultation requests

### Key Components
- **ProfessionalHeader**: Navigation specific to professionals with earnings display
- **ProfessionalSidebar**: Professional-specific navigation with quick actions
- **DashboardStats**: Performance metrics and KPIs with trend analysis
- **JobOpportunities**: Available job listings with AI-powered matching
- **OngoingProjects**: Current project tracking with milestone updates
- **AvailabilityCalendar**: Schedule management with drag-and-drop
- **EnhancedAvailabilityCalendar**: Advanced calendar features with recurring slots

### Calendar Components
- **DayView**: Single day schedule view with hourly slots
- **WeekView**: Weekly schedule overview with drag-and-drop
- **CalendarSyncModal**: External calendar integration (Google, Outlook)
- **BulkAvailabilityModal**: Bulk schedule updates with templates
- **CalendarTemplatesModal**: Pre-defined schedule templates
- **DayDetailsModal**: Detailed daily schedule management
- **FilterModal**: Calendar filtering and view options

### Forms
- **PersonalInfoForm**: Basic profile information with photo upload
- **SkillsForm**: Skills and expertise management with proficiency levels
- **ExperienceForm**: Work experience and portfolio with project showcase
- **CertificationsForm**: Professional certifications with verification
- **PaymentSettingsForm**: Payment and billing preferences with tax settings
- **AccountSettingsForm**: Account configuration with privacy controls

### Modals
- **JobApplicationModal**: Job application submission with cover letter
- **ProjectDetailsModal**: Detailed project information with communication tools
- **BulkAvailabilityModal**: Bulk schedule updates with recurrence patterns
- **CalendarSyncModal**: External calendar integration with conflict resolution
- **CalendarTemplatesModal**: Schedule templates with customization
- **DayDetailsModal**: Daily schedule details with booking management
- **FilterModal**: Search and filter options with saved preferences

### API Requirements
```typescript
// Professional Profile
GET /api/professionals/profile
PUT /api/professionals/profile
POST /api/professionals/skills
DELETE /api/professionals/skills/:id
POST /api/professionals/portfolio
GET /api/professionals/:id/public-profile

// Job Opportunities
GET /api/professionals/opportunities
POST /api/professionals/opportunities/:id/apply
GET /api/professionals/applications
PUT /api/professionals/applications/:id
GET /api/professionals/opportunities/recommendations

// Calendar & Availability
GET /api/professionals/calendar
POST /api/professionals/availability
PUT /api/professionals/availability/:id
DELETE /api/professionals/availability/:id
POST /api/professionals/calendar/sync
GET /api/professionals/calendar/templates

// Projects
GET /api/professionals/projects
GET /api/professionals/projects/:id
POST /api/professionals/projects/:id/update
POST /api/professionals/projects/:id/deliverable

// Certifications
GET /api/professionals/certifications
POST /api/professionals/certifications
PUT /api/professionals/certifications/:id
DELETE /api/professionals/certifications/:id
POST /api/professionals/certifications/:id/verify

// Messages
GET /api/professionals/messages
POST /api/professionals/messages
GET /api/professionals/messages/threads
PUT /api/professionals/messages/:id/read

// Earnings & Analytics
GET /api/professionals/earnings
GET /api/professionals/analytics
GET /api/professionals/performance-metrics
```

---

## 3. Service Vendors (Service Providers)

### Pages
- **ServiceVendorDashboard** (`/service-vendor-dashboard`)
  - Purpose: Service vendor main control center
  - Features: RFQ management, project tracking, team coordination, performance analytics
  
- **ServiceVendorRFQs** (`/service-vendor-rfqs`)
  - Purpose: RFQ response and proposal management
  - Features: RFQ browsing, proposal creation, submission tracking, AI-assisted responses
  
- **ServiceVendorProjects** (`/service-vendor-projects`)
  - Purpose: Active project management
  - Features: Project status, milestone tracking, deliverable management, client communication
  
- **ServiceVendorServices** (`/service-vendor-services`)
  - Purpose: Service catalog management
  - Features: Service listings, pricing, capability showcase, package creation
  
- **ServiceVendorProfile** (`/service-vendor-profile`)
  - Purpose: Vendor profile and company information
  - Features: Company details, team management, certifications, portfolio

- **ServiceVendorMessages** (`/service-vendor-messages`)
  - Purpose: Communication hub for service vendors
  - Features: Client communication, project discussions, RFQ clarifications

### Key Components
- **ServiceVendorHeader**: Service vendor navigation with notification center
- **ServiceVendorSidebar**: Service-specific sidebar navigation with quick stats
- **RFQManagement**: RFQ browsing and response system with AI recommendations
- **ActiveProjects**: Current project dashboard with timeline view
- **TeamAvailability**: Team member availability tracking with skill matching
- **DashboardStats**: Service vendor KPIs with comparative analysis
- **ProjectDetailsModal**: Project management with milestone tracking
- **ProposalCreationModal**: AI-assisted proposal writing with templates

### Modals
- **RFQDetailsModal**: Detailed RFQ information with requirements analysis
- **ProposalCreationModal**: Proposal writing interface with AI assistance
- **ProjectDetailsModal**: Project information and updates with file sharing
- **ServiceModal**: Service creation and editing with pricing strategies
- **TeamManagementModal**: Team member management with role assignments

### Forms & Sections
- **CompanyInfoForm**: Basic company information with logo upload
- **ServicesSkillsForm**: Service offerings and capabilities with skill matrix
- **TeamMembersSection**: Team member management with certification tracking
- **CertificationsSection**: Company certifications with renewal tracking
- **ProjectsPortfolioSection**: Portfolio and past projects with case studies

### API Requirements
```typescript
// RFQ Management
GET /api/service-vendors/rfqs
GET /api/service-vendors/rfqs/:id
POST /api/service-vendors/rfqs/:id/respond
GET /api/service-vendors/proposals
PUT /api/service-vendors/proposals/:id
GET /api/service-vendors/rfqs/recommendations

// Project Management
GET /api/service-vendors/projects
POST /api/service-vendors/projects/:id/update
GET /api/service-vendors/projects/:id/milestones
POST /api/service-vendors/projects/:id/deliverables
GET /api/service-vendors/projects/:id/timeline

// Service Catalog
GET /api/service-vendors/services
POST /api/service-vendors/services
PUT /api/service-vendors/services/:id
DELETE /api/service-vendors/services/:id
GET /api/service-vendors/services/analytics

// Team Management
GET /api/service-vendors/team
POST /api/service-vendors/team
PUT /api/service-vendors/team/:id
DELETE /api/service-vendors/team/:id
GET /api/service-vendors/team/availability
POST /api/service-vendors/team/:id/certifications

// Portfolio & Case Studies
GET /api/service-vendors/portfolio
POST /api/service-vendors/portfolio/projects
PUT /api/service-vendors/portfolio/projects/:id
GET /api/service-vendors/case-studies
```

---

## 4. Product Vendors (Product Suppliers)

### Pages
- **ProductVendorDashboard** (`/product-vendor-dashboard`)
  - Purpose: Product vendor operations center
  - Features: Order management, inventory tracking, RFQ responses, sales analytics
  
- **ProductVendorCatalog** (`/product-vendor-catalog`)
  - Purpose: Product catalog management
  - Features: Product listings, inventory, pricing, specifications, bulk operations
  
- **ProductVendorOrders** (`/product-vendor-orders`)
  - Purpose: Order processing and fulfillment
  - Features: Order tracking, shipping, invoicing, returns, automated workflows
  
- **ProductVendorRFQs** (`/product-vendor-rfqs`)
  - Purpose: Product RFQ management
  - Features: Quote generation, pricing, delivery terms, bulk quoting
  
- **ProductVendorProfile** (`/product-vendor-profile`)
  - Purpose: Vendor profile and settings
  - Features: Company information, certifications, partnerships, compliance documents

- **ProductVendorMessages** (`/product-vendor-messages`)
  - Purpose: Communication center for product vendors
  - Features: Customer inquiries, order communications, technical support

### Key Components
- **ProductVendorHeader**: Product vendor navigation with order alerts
- **ProductVendorSidebar**: Product-specific navigation with inventory alerts
- **OrdersManagement**: Order processing interface with workflow automation
- **ProductCatalogView**: Product display and management with bulk editing
- **RFQManagement**: Product RFQ handling with automated quoting
- **DashboardStats**: Product vendor metrics with inventory insights
- **MessageCenter**: Communication hub with customer support features

### Modals
- **OrderDetailsModal**: Detailed order information with shipping options
- **QuotationModal**: Quote creation interface with pricing rules
- **ProductModal**: Product creation and editing with media upload
- **InventoryModal**: Inventory management with reorder alerts
- **ShippingModal**: Shipping configuration with carrier integration

### Forms & Sections
- **CompanyInfoForm**: Company profile management with certifications
- **ProductCatalogSection**: Product catalog management with categorization
- **BrandsPartnersSection**: Brand and partnership information with contracts
- **ShippingReturnsSection**: Shipping and return policies with automation
- **CertificationsSection**: Product and company certifications with compliance

### API Requirements
```typescript
// Product Catalog
GET /api/product-vendors/catalog
POST /api/product-vendors/products
PUT /api/product-vendors/products/:id
DELETE /api/product-vendors/products/:id
GET /api/product-vendors/products/:id/inventory
POST /api/product-vendors/products/bulk-update

// Order Management
GET /api/product-vendors/orders
GET /api/product-vendors/orders/:id
POST /api/product-vendors/orders/:id/update-status
POST /api/product-vendors/orders/:id/ship
POST /api/product-vendors/orders/:id/invoice
GET /api/product-vendors/orders/analytics

// RFQ & Quotations
GET /api/product-vendors/rfqs
POST /api/product-vendors/rfqs/:id/quote
GET /api/product-vendors/quotes
PUT /api/product-vendors/quotes/:id
POST /api/product-vendors/quotes/bulk-generate

// Inventory Management
GET /api/product-vendors/inventory
POST /api/product-vendors/inventory/update
GET /api/product-vendors/inventory/reports
POST /api/product-vendors/inventory/reorder
GET /api/product-vendors/inventory/alerts

// Brands & Partnerships
GET /api/product-vendors/brands
POST /api/product-vendors/brands
PUT /api/product-vendors/brands/:id
GET /api/product-vendors/partnerships
POST /api/product-vendors/partnerships
```

---

## 5. Logistics Vendors (Transportation/Logistics)

### Pages
- **LogisticsVendorDashboard** (`/logistics-vendor-dashboard`)
  - Purpose: Logistics operations command center
  - Features: Transport requests, fleet management, delivery tracking, route optimization
  
- **LogisticsVendorRequests** (`/logistics-vendor-requests`)
  - Purpose: Transportation request management
  - Features: Request processing, route optimization, capacity planning, automated quotes
  
- **LogisticsVendorFleet** (`/logistics-vendor-fleet`)
  - Purpose: Fleet and equipment management
  - Features: Vehicle tracking, maintenance, driver assignment, fuel management
  
- **LogisticsVendorDeliveries** (`/logistics-vendor-deliveries`)
  - Purpose: Active delivery tracking
  - Features: Real-time tracking, status updates, proof of delivery, customer notifications
  
- **LogisticsVendorProfile** (`/logistics-vendor-profile`)
  - Purpose: Logistics company profile
  - Features: Fleet information, service areas, certifications, specialization settings

- **LogisticsVendorMessages** (`/logistics-vendor-messages`)
  - Purpose: Communication hub for logistics vendors
  - Features: Client communication, driver coordination, delivery notifications

### Key Components
- **LogisticsVendorHeader**: Logistics-specific navigation with fleet alerts
- **LogisticsVendorSidebar**: Specialized sidebar with equipment focus and specialization features
- **TransportRequests**: Request management interface with route optimization
- **ActiveDeliveries**: Real-time delivery tracking with GPS integration
- **EquipmentFleet**: Fleet management dashboard with maintenance tracking
- **SpecializationFeatures**: Equipment-specific features with dynamic UI adaptation
- **MessagesHub**: Communication center with multi-channel support

### Modals
- **RequestDetailsModal**: Transport request details with route planning
- **CustomQuoteModal**: Custom quotation creation with cost calculation
- **LiveTrackingModal**: Real-time delivery tracking with map integration
- **VehicleDetailsModal**: Vehicle information and status with maintenance history
- **VehicleTrackingModal**: Vehicle location tracking with geofencing
- **AddVehicleModal**: New vehicle registration with documentation upload
- **AddDriverModal**: Driver onboarding with license verification
- **ContactDriverModal**: Driver communication with location sharing
- **UpdateDeliveryStatusModal**: Delivery status updates with photo proof
- **RouteOptimizerModal**: Route planning optimization with traffic integration
- **EquipmentDeploymentModal**: Equipment deployment planning with scheduling

### Forms & Sections
- **CompanyInfoForm**: Logistics company information with service area mapping
- **FleetEquipmentSection**: Fleet and equipment management with specialization support
- **ServiceAreasSection**: Geographic service coverage with zone pricing
- **LicensesPermitsSection**: Required certifications and permits with renewal tracking
- **DriversPersonnelSection**: Staff and operator management with qualification tracking

### Specialization Context
- Uses **VendorSpecializationContext** for equipment-specific features
- Supports specializations: heavy-equipment, crane-services, general-logistics
- Dynamic UI adaptation based on specialization type
- Specialized modals and components per equipment type

### API Requirements
```typescript
// Transport Requests
GET /api/logistics-vendors/requests
GET /api/logistics-vendors/requests/:id
POST /api/logistics-vendors/requests/:id/accept
POST /api/logistics-vendors/requests/:id/quote
GET /api/logistics-vendors/requests/capacity-planning

// Fleet Management
GET /api/logistics-vendors/fleet
POST /api/logistics-vendors/vehicles
PUT /api/logistics-vendors/vehicles/:id
DELETE /api/logistics-vendors/vehicles/:id
GET /api/logistics-vendors/vehicles/:id/tracking
POST /api/logistics-vendors/vehicles/:id/maintenance

// Delivery Management
GET /api/logistics-vendors/deliveries
POST /api/logistics-vendors/deliveries/:id/update-status
GET /api/logistics-vendors/deliveries/:id/tracking
POST /api/logistics-vendors/deliveries/:id/proof
GET /api/logistics-vendors/deliveries/live-tracking

// Driver Management
GET /api/logistics-vendors/drivers
POST /api/logistics-vendors/drivers
PUT /api/logistics-vendors/drivers/:id
DELETE /api/logistics-vendors/drivers/:id
GET /api/logistics-vendors/drivers/availability
POST /api/logistics-vendors/drivers/:id/verify-license

// Route Optimization
POST /api/logistics-vendors/routes/optimize
GET /api/logistics-vendors/routes/:id
POST /api/logistics-vendors/routes/:id/update
GET /api/logistics-vendors/routes/traffic-data

// Specialization Features
GET /api/logistics-vendors/specializations
PUT /api/logistics-vendors/specialization/:type
GET /api/logistics-vendors/equipment-types
POST /api/logistics-vendors/specialized-quotes
```

---

## Cross-Cutting Concerns

### Shared Components
- **BaseModal**: Standard modal wrapper with backdrop and animation
- **ConfirmationModal**: User confirmation dialogs with customizable actions
- **DetailsModal**: Generic detail view modal with scrollable content
- **FormModal**: Form-based modal wrapper with validation support
- **LoadingSpinner**: Loading state indicators with theme integration
- **SkeletonLoader**: Content loading skeletons with animation
- **ErrorBoundary**: Error handling wrapper with fallback UI
- **NotificationBell**: System notifications with real-time updates
- **ProfileCompletionWidget**: Profile completion tracking with progress visualization
- **WelcomeModal**: First-time user onboarding with feature highlights
- **TestComponent**: Development testing component
- **GenericDashboardStats**: Reusable dashboard statistics component
- **GenericHeader**: Configurable header component for all user types
- **FastLoadingState**: Optimized loading states for performance
- **LoadingCard**: Card-based loading placeholder
- **LoadingState**: Generic loading state management
- **TableLoadingState**: Table-specific loading indicators
- **MessageCenter**: Unified messaging system across user types

### Authentication Components
- **AuthLayout**: Authentication page wrapper with branding
- **SignInForm**: User login interface with validation
- **IndustrySignUpForm**: Industry user registration with company verification

### Shared Contexts
- **UserContext**: User authentication and profile management
- **ThemeContext**: UI theme management with system preference detection
- **NotificationContext**: System notifications with toast integration
- **NotificationStoreContext**: Notification persistence and state management
- **VendorSpecializationContext**: Vendor specialization management with dynamic features

### Shared Hooks
- **useAuth**: Authentication management with role-based access
- **useAsyncOperation**: Async operation handling with error management
- **useNotifications**: Toast notifications with custom styling
- **usePagination**: Data pagination with server-side support
- **useSearch**: Search functionality with debouncing and filters
- **useModal**: Modal state management with backdrop controls
- **useFastData**: Optimized data fetching with caching
- **usePerformanceMonitor**: Performance tracking and optimization
- **use-mobile**: Mobile device detection hook
- **use-toast**: Toast notification system integration

### Shared Utils
- **authUtils**: Authentication helpers and token management
- **dateUtils**: Date formatting and manipulation with timezone support
- **colorUtils**: Color and theme utilities with HSL color system
- **statusUtils**: Status badge management with theme integration
- **shared**: Common utility functions and helpers
- **vendorSpecializationMapping**: Vendor type mappings and configurations
- **profileCompleteness**: Profile completion calculation with weighted scoring
- **messageConfigs**: Message system configuration per user type
- **navigationConfigs**: Navigation configuration for headers and menus
- **performance**: Performance optimization utilities
- **mockNotifications**: Mock data for notification testing

### Shared Types
- **shared.ts**: Common type definitions and interfaces
- **dashboard.ts**: Dashboard-specific types and configurations
- **notifications.ts**: Notification system types and enums
- **vendor-sidebar.ts**: Vendor sidebar types and configurations

### UI Components Library
Comprehensive shadcn/ui component library including:
- **Accordion, Alert, Avatar, Badge, Button**: Basic UI elements
- **Calendar, Card, Carousel, Chart**: Data display components
- **Dialog, Drawer, Dropdown**: Modal and overlay components
- **Form, Input, Label, Select**: Form elements with validation
- **Navigation, Pagination, Progress**: Navigation components
- **Table, Tabs, Toast**: Data presentation components
- **All components**: Theme-aware with HSL color system integration

---

## Public Pages & Marketing

### Marketing Pages
- **Index** (`/`): Landing page with hero section, value proposition, features
- **About** (`/about`): Company information and mission
- **Pricing** (`/pricing`): Pricing plans and feature comparison
- **Contact** (`/contact`): Contact information and inquiry form
- **Blog** (`/blog`): Company blog and articles
- **BlogArticle** (`/blog/:slug`): Individual blog post pages
- **Careers** (`/careers`): Job openings and company culture

### Public Directory Pages
- **Vendors** (`/vendors`): Public vendor directory
- **VendorDetails** (`/vendor/:id`): Individual vendor profiles
- **Experts** (`/experts`): Expert consultant directory
- **ProfessionalDetails** (`/professional/:id`): Public professional profiles

### Legal & Compliance Pages
- **Terms** (`/terms`): Terms of service
- **Privacy** (`/privacy`): Privacy policy
- **Legal** (`/legal`): Legal information and compliance

### Authentication Pages
- **SignIn** (`/signin`): User login with role-based redirect
- **SignUp** (`/signup`): Multi-step user registration
- **ForgotPassword** (`/forgot-password`): Password reset request
- **ResetPassword** (`/reset-password`): Password reset form
- **StakeholderOnboarding** (`/stakeholder-onboarding`): Stakeholder invitation flow

### Error & Utility Pages
- **NotFound** (`/404`): Page not found with navigation
- **TestPage** (`/test`): Development testing page
- **ProfileCompletion** (`/profile-completion`): Profile setup wizard

### Components for Public Pages
- **Navbar**: Main navigation with responsive design
- **HeroSection**: Landing page hero with call-to-action
- **ValueProposition**: Value proposition showcase
- **FeaturesSection**: Feature highlights with icons
- **TestimonialsSection**: Customer testimonials carousel
- **AboutSection**: Company story and team
- **Footer**: Site footer with links and social media

---

## Admin & Management Features

### Approval & Workflow Management
- **ApprovalDashboard** (`/approval-dashboard`): Centralized approval management
- **PendingApproval** (`/pending-approval`): Pending user approvals and verification

### Approval Components
- **ApprovalModal**: Generic approval workflow interface
- **ApprovalMatrixConfiguration**: Workflow configuration tools
- **PendingUserApproval**: User verification and onboarding approval
- **ApprovalNotificationCenter**: Approval-specific notifications

### Admin Contexts
- **ApprovalContext**: Basic approval workflow management
- **EnhancedApprovalContext**: Advanced multi-level approval workflows

### Admin Types
- **approval.ts**: Basic approval workflow types
- **enhancedApproval.ts**: Complex approval workflow types
- **pendingUser.ts**: User approval and verification types

---

## Performance & Security

### Performance Features
- **Code Splitting**: Route-based code splitting with React.lazy
- **Lazy Loading**: Component lazy loading for optimization
- **Caching**: Data caching with React Query
- **Optimization**: Performance monitoring and optimization hooks
- **Fast Loading States**: Optimized loading indicators
- **Skeleton Loading**: Content placeholders during loading

### Security Features
- **Role-Based Access Control**: Comprehensive permission system
- **Authentication Flow**: Secure login with token management
- **Input Validation**: Zod schema validation for all forms
- **Error Boundaries**: Robust error handling and recovery
- **Secure Routing**: Protected routes with authentication checks
- **Data Sanitization**: Input sanitization and XSS protection

### Error Handling
- **ErrorBoundary**: Global error boundary with fallback UI
- **RouteErrorBoundary**: Route-specific error handling
- **Form Validation**: Client-side validation with server-side backup
- **Network Error Handling**: Retry mechanisms and offline support

---

## Backend API Requirements

### Authentication & User Management
```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/verify-email
POST /api/auth/resend-verification

// User Profile Management
GET /api/users/profile
PUT /api/users/profile
POST /api/users/avatar
DELETE /api/users/avatar
GET /api/users/notifications
PUT /api/users/notification-settings
GET /api/users/preferences
PUT /api/users/preferences
GET /api/users/security-settings
PUT /api/users/security-settings

// Role Management
GET /api/users/roles
PUT /api/users/role
GET /api/users/permissions
POST /api/users/role-request
```

### File Management & Storage
```typescript
// File Upload & Management
POST /api/files/upload
GET /api/files/:id
DELETE /api/files/:id
POST /api/files/:id/version
GET /api/files/:id/versions
POST /api/files/bulk-upload
GET /api/files/download/:id
POST /api/files/:id/share
PUT /api/files/:id/permissions

// Document Management
GET /api/documents
POST /api/documents
PUT /api/documents/:id
DELETE /api/documents/:id
GET /api/documents/:id/history
POST /api/documents/:id/approve
GET /api/documents/templates
```

### Real-time Communication
```typescript
// WebSocket Events
WS /api/ws/connect
WS /api/ws/notifications
WS /api/ws/chat
WS /api/ws/tracking
WS /api/ws/status-updates

// Messaging System
GET /api/messages
POST /api/messages
GET /api/messages/:id
PUT /api/messages/:id/read
DELETE /api/messages/:id
GET /api/messages/conversations
POST /api/messages/broadcast
GET /api/messages/templates

// Notification System
GET /api/notifications
POST /api/notifications
PUT /api/notifications/mark-read
DELETE /api/notifications/:id
GET /api/notifications/settings
PUT /api/notifications/settings
POST /api/notifications/subscribe
DELETE /api/notifications/unsubscribe
```

### Search & Analytics
```typescript
// Global Search
GET /api/search?q=:query&type=:type&filters=:filters
GET /api/search/suggestions?q=:query
POST /api/search/advanced
GET /api/search/recent
DELETE /api/search/history

// Analytics & Reporting
GET /api/analytics/dashboard
GET /api/analytics/performance
GET /api/analytics/reports
POST /api/analytics/custom-report
GET /api/analytics/user-activity
GET /api/analytics/system-health
POST /api/analytics/export

// Business Intelligence
GET /api/bi/kpis
GET /api/bi/trends
GET /api/bi/forecasts
POST /api/bi/custom-metrics
GET /api/bi/benchmarks
```

### Integration APIs
```typescript
// Third-party Integrations
POST /api/integrations/calendar/sync
GET /api/integrations/calendar/events
POST /api/integrations/payment/process
GET /api/integrations/payment/status
POST /api/integrations/shipping/create
GET /api/integrations/shipping/track
POST /api/integrations/email/send
GET /api/integrations/sms/send

// External API Proxies
GET /api/proxy/maps/geocode
GET /api/proxy/weather/forecast
GET /api/proxy/traffic/conditions
POST /api/proxy/verification/document
```

---

## Data Models & Relationships

### Core Entities
```typescript
interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  profile: UserProfile;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isActive: boolean;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  companyId?: string;
  vendorCategory?: VendorCategory;
  specialization?: string;
  certifications: Certification[];
  preferences: UserPreferences;
}

interface Company {
  id: string;
  name: string;
  type: 'industry' | 'vendor' | 'logistics';
  email: string;
  phone: string;
  address: Address;
  website?: string;
  logo?: string;
  description?: string;
  certifications: Certification[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Business Entities
```typescript
interface Requirement {
  id: string;
  title: string;
  description: string;
  industry: string;
  category: string;
  priority: Priority;
  budget: BudgetRange;
  timeline: Timeline;
  specifications: Specification[];
  documents: Document[];
  approvalWorkflow: ApprovalWorkflow;
  status: RequirementStatus;
  createdBy: string;
  assignedTo?: string[];
  rfqs: RFQ[];
  createdAt: Date;
  updatedAt: Date;
}

interface RFQ {
  id: string;
  requirementId: string;
  title: string;
  description: string;
  specifications: Specification[];
  deadline: Date;
  vendors: string[];
  responses: RFQResponse[];
  status: RFQStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Quote {
  id: string;
  rfqId: string;
  vendorId: string;
  price: number;
  currency: string;
  timeline: Timeline;
  terms: string;
  validUntil: Date;
  documents: Document[];
  status: QuoteStatus;
  evaluationScore?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Project & Workflow Entities
```typescript
interface Project {
  id: string;
  requirementId: string;
  vendorId: string;
  title: string;
  description: string;
  status: ProjectStatus;
  milestones: Milestone[];
  payments: Payment[];
  documents: Document[];
  timeline: Timeline;
  budget: number;
  assignedTeam: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: Date;
  completedDate?: Date;
  status: MilestoneStatus;
  deliverables: Deliverable[];
  paymentPercentage: number;
  dependencies: string[];
  assignedTo: string[];
}

interface Payment {
  id: string;
  projectId: string;
  milestoneId?: string;
  amount: number;
  currency: string;
  type: PaymentType;
  status: PaymentStatus;
  dueDate: Date;
  paidDate?: Date;
  reference?: string;
  invoiceId?: string;
}
```

### Logistics & Specialized Entities
```typescript
interface TransportRequest {
  id: string;
  customerId: string;
  origin: Location;
  destination: Location;
  cargo: CargoDetails;
  requirements: string[];
  preferredDate: Date;
  deadline: Date;
  specialInstructions?: string;
  quotes: TransportQuote[];
  status: RequestStatus;
  createdAt: Date;
}

interface Vehicle {
  id: string;
  vendorId: string;
  type: VehicleType;
  make: string;
  model: string;
  year: number;
  capacity: VehicleCapacity;
  specializations: string[];
  currentLocation?: Location;
  status: VehicleStatus;
  maintenance: MaintenanceRecord[];
  driver?: Driver;
  documents: Document[];
}

interface Driver {
  id: string;
  vendorId: string;
  firstName: string;
  lastName: string;
  license: LicenseDetails;
  certifications: Certification[];
  phone: string;
  currentVehicle?: string;
  status: DriverStatus;
  location?: Location;
}
```

### Relationships
- User -> Company (1:1 or Many:1 depending on role)
- Company -> Requirements (1:Many for industries)
- Requirement -> RFQs (1:Many)
- RFQ -> Quotes (1:Many)
- Quote -> PurchaseOrder (1:1 when accepted)
- PurchaseOrder -> Project (1:1)
- Project -> Milestones (1:Many)
- Project -> Payments (1:Many)
- Milestone -> Deliverables (1:Many)
- User -> Messages (Many:Many through conversations)
- Company -> Certifications (1:Many)
- Vendor -> Services/Products (1:Many)
- LogisticsVendor -> Fleet (1:Many)
- Fleet -> Vehicles (1:Many)
- Vehicle -> Driver (1:1 when assigned)

---

## Authentication & Authorization

### Role-Based Access Control
```typescript
enum UserRole {
  INDUSTRY = 'industry',
  PROFESSIONAL = 'professional',
  SERVICE_VENDOR = 'service_vendor',
  PRODUCT_VENDOR = 'product_vendor',
  LOGISTICS_VENDOR = 'logistics_vendor',
  ADMIN = 'admin'
}

interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
  conditions?: Record<string, any>;
}

interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
  restrictions?: Record<string, any>;
}
```

### Authentication Flow
1. **Registration**: Multi-step registration with role selection
2. **Email Verification**: Email confirmation required
3. **Profile Completion**: Role-specific profile setup
4. **Admin Approval**: Manual approval for certain vendor types
5. **Login**: JWT-based authentication with refresh tokens
6. **Role-Based Routing**: Automatic redirect to appropriate dashboard
7. **Session Management**: Secure session handling with timeout

### Permission Matrix
```typescript
const PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.INDUSTRY]: [
    { resource: 'requirements', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'rfqs', actions: ['create', 'read', 'update'] },
    { resource: 'purchase_orders', actions: ['create', 'read', 'update'] },
    { resource: 'projects', actions: ['read', 'update'] },
    { resource: 'stakeholders', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'approval_matrix', actions: ['create', 'read', 'update'] }
  ],
  [UserRole.PROFESSIONAL]: [
    { resource: 'opportunities', actions: ['read'] },
    { resource: 'applications', actions: ['create', 'read', 'update'] },
    { resource: 'projects', actions: ['read', 'update'] },
    { resource: 'calendar', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'profile', actions: ['read', 'update'] }
  ],
  // ... other roles
};
```

---

## Integration Requirements

### Real-time Features
- **WebSocket Connections**: Live updates for all user types
- **Real-time Notifications**: Instant notification delivery
- **Live Project Tracking**: Real-time project status updates
- **Fleet Tracking**: GPS tracking for logistics vendors
- **Chat System**: Real-time messaging between users

### External Integrations
```typescript
// Required External Services
interface ExternalIntegrations {
  email: 'SendGrid' | 'AWS SES' | 'Mailgun';
  sms: 'Twilio' | 'AWS SNS';
  storage: 'AWS S3' | 'MongoDB GridFS' | 'Cloudinary';
  payment: 'Stripe' | 'PayPal' | 'Razorpay';
  maps: 'Google Maps' | 'Mapbox';
  calendar: 'Google Calendar' | 'Outlook' | 'CalDAV';
  shipping: 'FedEx' | 'UPS' | 'DHL' | 'Local Carriers';
  verification: 'Jumio' | 'Onfido' | 'Manual Review';
}
```

### API Response Format
```typescript
interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ValidationError[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  meta?: {
    timestamp: string;
    version: string;
    requestId: string;
  };
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}
```

### WebSocket Events
```typescript
interface WebSocketEvents {
  // Notifications
  'notification:new': NotificationData;
  'notification:read': { notificationId: string };
  
  // Project Updates
  'project:status_changed': ProjectStatusUpdate;
  'project:milestone_completed': MilestoneUpdate;
  'project:payment_processed': PaymentUpdate;
  
  // Real-time Tracking
  'vehicle:location_update': VehicleLocationUpdate;
  'delivery:status_update': DeliveryStatusUpdate;
  
  // Messaging
  'message:new': MessageData;
  'message:read': MessageReadUpdate;
  'conversation:typing': TypingIndicator;
  
  // System Events
  'system:maintenance': MaintenanceNotice;
  'system:alert': SystemAlert;
}
```

---

## Technical Architecture Summary

This comprehensive frontend analysis provides a complete blueprint for developing a robust Node.js backend that supports all aspects of the Diligence.ai platform. The analysis covers:

1. **5 Distinct User Types** with unique workflows and requirements
2. **40+ Pages** across all user types and public areas
3. **100+ Components** including modals, forms, and specialized features
4. **15+ Contexts** for state management and data flow
5. **20+ Custom Hooks** for business logic and optimization
6. **Comprehensive Type System** with TypeScript interfaces
7. **Complete API Requirements** for all user operations
8. **Real-time Features** with WebSocket integration
9. **Security & Performance** considerations throughout
10. **External Integrations** for complete functionality

### Backend Development Priorities
1. **Authentication System**: Multi-role authentication with approval workflows
2. **Core Business Logic**: Requirements, RFQs, projects, and workflows
3. **User Management**: Profile management and role-based access control
4. **Real-time Communication**: WebSocket implementation for live updates
5. **File Management**: Document upload, storage, and version control
6. **External Integrations**: Payment, shipping, calendar, and communication services
7. **Analytics & Reporting**: Business intelligence and performance metrics
8. **Security Implementation**: Data validation, authorization, and compliance
9. **Performance Optimization**: Caching, indexing, and query optimization
10. **Testing & Deployment**: Comprehensive testing and CI/CD pipeline

This analysis ensures that the backend development will fully support all frontend functionality while maintaining high standards of security, performance, and scalability.
